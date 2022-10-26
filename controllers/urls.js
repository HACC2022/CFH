/**
 * GET /urls
 * URLs page.
 */
const { request } = require('gaxios');
const Url = require('../models/Url')
const User = require('../models/User')

exports.index = async (req, res) => {
  try {
    const links = await Url.find()
    const users = await User.find()
    res.render('urls', {
      title: 'URLs',
      urlInfo:links,
      currentUser:req.user.id,
      userInfo:users
    })
  } catch(error) {
    console.error(error)
  }
};