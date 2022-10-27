/**
 * GET /urls
 * URLs page.
 */
const Url = require('../models/Url')
const User = require('../models/User')

module.exports = {
  index: async (req, res) => {
    try {
      const links = await Url.find()
      const users = await User.find()
      res.render('urls', {
        title: 'URLs',
        urlInfo:links,
        currentUser:req.user.id,
        userInfo:users,
        visits: links.clickCounter,
      })
    } catch(error) {
      console.error(error)
    }
  },
  deleteUrl: async (req, res) => {
    console.log(req.body.slugFromJSFile)
    try {
        await Url.findOneAndDelete({slug:req.body.slugFromJSFile})
        console.log('Deleted Todo')
        res.json('Deleted It')
    } catch(error) {
        console.error(error)
    }
  }
};