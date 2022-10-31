const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
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
  expirationDate: {
    type: Date,
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
