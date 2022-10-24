const Url = require('../models/Url')
const { validateUrl } = require('../utils/utils')
// const dotenv = require('dotenv')
// dotenv.config({ path: '.env.example' })

exports.postShortUrl = async (req, res) => {
  const { longUrl, user } = req.body
  const base = process.env.BASE_URL

  const { nanoid } = await import ('nanoid')

  const slug = nanoid(5)
  if (validateUrl(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl, user })
      if (url) {
        res.json(url)
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