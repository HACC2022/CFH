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
        await Urls.findOneAndDelete({slug:req.body.slugFromJSFile})
        console.log('Deleted Todo')
        res.json('Deleted It')
    } catch(error) {
        console.error(error)
    }
  },
  sortDescending: async (req, res) => {
    try {
      const links = await Urls.find().sort({date:-1})
      const users = await Users.find()
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
  sortAscending: async (req, res) => {
    try {
      const links = await Urls.find().sort({date:1})
      const users = await Users.find()
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
  editUrl: async (req, res) => {
    try {
      let links = await Urls.findById(req.params.id)
      let users = await Users.find({email:links.user})

      if (!users) {
        res.redirect('/')
      }
      
      if (users[0].email != req.user.email) {
        res.redirect('/urls')
      } else {
        res.render('edit', {
          title: 'Edit Url',
          users,
          links})
      }
    } catch(error) {
      console.error(error)
    }
  },
  updateUrl: async (req, res) => {
    // TODO: Edit functionality
    try {
      console.log('if u see this it works')
      // if (!users) {
      //   res.redirect('/')
      // }
      
      // if (users[0].email != req.user.email) {
      //   res.redirect('/urls')
      // } else {
      //   links = await Url.findOneAndUpdate({_id:req.params.id}, req.body, {
      //     new: true,
      //     runValidators: true
      //   })
      //   res.redirect('/urls')
      // }
    } catch(error) {
      console.error(error)
    }
  }
};