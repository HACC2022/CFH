/**
 * GET /
 * Admin page.
 */

const Url = require('../models/Url')
const SusUrlEvent = require('../models/SusUrlEvent');

 exports.index = async(req, res) => {
  const susEvents = await SusUrlEvent.find({})
    res.render('admin', {
      title: 'Admin',
      susEvents: susEvents
    });
  };

exports.getURLs = (req, res) => {
  Url.find({}, function(err, urls) {
    if (err) {
      console.error(err);
    }
    res.json(urls)
  })
}

exports.country = async (req, res) => {
  const countryMap = {};

  Url.find({}, function(err, urls) {
    if (err) {
      console.error(err);
    }
    for (const url of urls) {
      const { country, countryCode } = url;
      if (countryMap[country]) {
        countryMap[country] += 1;
      } else {
        countryMap[country] = 1;
      }
    }
    res.json(countryMap);
  });
};
