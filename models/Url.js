const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clickCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  ipAddess: {
    type: String,
  },
  country: {
    type: String,
  },
  countryCode: {
    type: String,
  }
})

module.exports = mongoose.model('Url', UrlSchema)
