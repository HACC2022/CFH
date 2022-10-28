const Url = require('../models/Url')
const { validateUrl } = require('../utils/utils')
const compareUrls = require('compare-urls');
// const dotenv = require('dotenv')
// dotenv.config({ path: '.env.example' })


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
  
  for (const deniedUrl of denylist) {
    if (denylist.includes(urlObj.hostname) || denylist.includes(urlObj.host)) {
      return "That URL domain is banned";
    }
  }

  return true;
}

const validators = [
  urlNotDenylisted
];

exports.postShortUrl = async (req, res) => {
  const { longUrl, user } = req.body
  const base = process.env.BASE_URL

  const { nanoid } = await import ('nanoid');

  const slug = nanoid(5)
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

  try {
    let url = await Url.findOne({ longUrl, user })
    if (url) {
      return res.json(url)
    } else {
      const shortUrl = `${base}/${slug}`

      url = new Url({
        longUrl,
        shortUrl,
        slug,
        date: new Date(),
        user,
      })

      await url.save()
      return res.json(url)
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
  try {
    const url = await Url.findOne({ slug: req.params.slug })
    if (url) {
      await Url.updateOne(
        { slug: req.params.slug },
        { $inc: { clickCounter: 1 } }
      )
      return res.redirect(url.longUrl)
    } else {
      res.status(404).json('No url found')
    } 
  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
}