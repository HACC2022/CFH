/**
 * GET /urls
 * URLs page.
 */
const Urls = require('../models/Url')
const Users = require('../models/User')

module.exports = {
  index: async (req, res) => {
    try {
      const link = req.query.p || 0;
      const linksPerPage = 10;
      const currentUser = await Users.find({_id: req.user.id})
      const userLinks = await Urls.find({user: currentUser[0].email}).sort({date:1}).skip(link * linksPerPage).limit(linksPerPage)
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
        console.log('Deleted URL')
        res.json('Deleted It')
    } catch(error) {
        console.error(error)
    }
  },
  sortDescending: async (req, res) => {
    try {
      const links = await Urls.find().sort({clickCounter:-1})
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
      const links = await Urls.find().sort({clickCounter:1})
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
    const currentUser = await Users.find({_id: req.user.id})
    const userLinks = await Urls.find({user: currentUser[0].email})
    try {
      if (!currentUser) {
        res.redirect('/')
      }
      
      if (currentUser[0].email != req.user.email) {
        res.redirect('/urls')
      } else {
        await Urls.findByIdAndUpdate(req.body.idFromJSFile, {slug: req.body.slugFromJSFile, longUrl: req.body.urlFromJSFile})
        console.log('Edited URL')
        res.json('Edited It')
      }
    } catch(error) {
      console.error(error)
    }
  }
};