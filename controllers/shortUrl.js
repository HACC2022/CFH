const Url = require('../models/Url')
Url.collection.createIndex({ slug: 1 }, { unique: true })
const { validateUrl } = require('../utils/utils')
const dns = require('dns');
const fetch = require('node-fetch');



async function lookupPromise(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address, family) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};


const urlNotDenylisted = (url) => {
  const denylist = [
    "menehune.azurewebsites.net", // Prevent recursive shortening
    "4chan.org", // Hackers known as 4chan
    "localhost" // Prevent self destruction
  ];

  let urlObj = {};
  try {
    urlObj = new URL(url);
  } catch (err) {
    return 'Invalid URL';
  }

  if (denylist.includes(urlObj.hostname) || denylist.includes(urlObj.host)) {
    return "That URL domain is banned";
  }

  return true;
}

const fileNotDenyListed = (url) => {
  const denylist = [
    'deepMiner.js',
    'deepMiner.min.js',
    'crypto-js.min.js',
    'cryptonight.js',
    'coin-hive.js',
    'coin-hive.min.js',
    'rockyou.txt',
    'darkc0de.lst'
  ];

  const filename = url.split('/').pop();

  if (denylist.includes(filename)) {
    return "That URL redirects to a known malicious file";
  }

  return true;
};

const validators = [
  urlNotDenylisted,
  fileNotDenyListed
];

exports.postShortUrl = async (req, res) => {
  const base = process.env.BASE_URL
  const { nanoid } = await import('nanoid');
  let { slug, longUrl, expirationDate, user } = req.body;

  if (!validateUrl(longUrl)) {
    return res.status(401).json({
      error: true,
      message: 'Invalid Url'
    });
  }

  for (const validator of validators) {
    const validationResult = validator(longUrl);
    if (validationResult !== true) {
      return res.status(400).json({
        error: true,
        message: validationResult
      });
    }
  }

  const ipAddress = await lookupPromise(new URL(longUrl).hostname);

  const response = await fetch(`http://ip-api.com/json/${ipAddress}`);

  const { country, countryCode } = await response.json();

  try {
    const queryParams = {
      longUrl,
      user
    };

    if (slug) {
      queryParams[slug] = slug;
    }

    let url = await Url.findOne(queryParams)
    if (url) {
      return res.json(url)
    } else {
      const id = nanoid(7);
      const shortUrl = `${base}/${slug || id}`;

      url = new Url({
        slug: slug || id,
        longUrl,
        shortUrl,
        expirationDate,
        date: new Date(),
        user,
        ipAddress,
        country,
        countryCode
      });

      await url.save();
      return res.json(url);
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: true,
      message: 'Server Error'
    });
  }
}

exports.getShortUrl = async (req, res) => {
  const { slug } = req.params;
  try {
    const url = await Url.findOne({ slug });
    if (url) {
      url.clickCounter++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: 'Url not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
