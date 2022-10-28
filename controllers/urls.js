/**
 * GET /urls
 * URLs page.
 */
const Urls = require('../models/Url')
const Users = require('../models/User')

module.exports = {
  index: async (req, res) => {
    try {
      const currentUser = await Users.find({_id: req.user.id})
      const userLinks = await Urls.find({user: currentUser[0].email})

      res.render('urls', {
        title: 'URLs',
        urlInfo:userLinks,
        currentUser:req.user.id,
        userInfo:currentUser,
        visits: userLinks.clickCounter,
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