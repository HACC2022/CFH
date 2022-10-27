const Url = require('../models/Url')
Url.collection.createIndex({ slug: 1 }, { unique: true })
const { validateUrl } = require('../utils/utils')
const dns = require('dns');
const fetch = require('node-fetch');


//* @route   POST /shorten
//* @desc    Create short URL
//* @access  Public

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

const validators = [
  urlNotDenylisted
];

exports.postShortUrl = async (req, res) => {
  const base = process.env.BASE_URL
  const { nanoid } = await import('nanoid');
  let { slug, longUrl, user } = req.body

  
  if (validateUrl(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl, user, slug  })
      if (url) {
        res.json(url)
      } else {
        const id = nanoid(7)
        const shortUrl = `${base}/${slug || id}`

        url = new Url({
          slug: slug || id,
          longUrl,
          shortUrl,
          date: new Date(),
          user,
        })

        await url.save()
        res.json(url)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(401).json('Invalid Url')
  }
}

exports.getShortUrl = async (req, res) => {
  const { slug } = req.params
  try {
    const url = await Url.findOne({ slug })
    if (url) {
      url.clickCounter++
      await url.save()
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json({ message: 'Url not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}


// exports.postShortUrl = async (req, res) => {
//   let { longUrl, user, slug } = req.body
//   const base = process.env.BASE_URL
//   const { nanoid } = await import ('nanoid')


//   if (validateUrl(longUrl)) {
//     try {
//       let url = await Url.find({ longUrl, user, slug })
//       if (url) {
//         res.json(url)
//       } else {

//         const url = new Url({
//           longUrl,
//           shortUrl,
//           slug,
//           date: new Date(),
//           user,
//         })
//         const shortUrl = `${base}/${slug}`
//         await url.save()
//         res.json(url)
//       }
//     } catch (err) {
//       console.error(err)
//       res.status(500).json('Server Error')
//     }
//   } else {
//     res.status(401).json('Invalid Url')
//   }
// }

// exports.getShortUrl = async (req, res) => {
//   try {
//     const url = await Url.findOne({ slug: req.params.slug })
//     if (url) {
//       await Url.updateOne(
//         { slug: req.params.slug },
//         { $inc: { clickCounter: 1 } }
//       )
//       return res.redirect(url.longUrl)
//     } else {
//       res.status(404).json('No url found')
//     } 
//   } catch (err) {
//     console.error(err)
//     res.status(500).json('Server Error')
//   }
// }