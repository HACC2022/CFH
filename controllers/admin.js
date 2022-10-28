/**
 * GET /
 * Admin page.
 */

const Url = require('../models/Url')

 exports.index = (req, res) => {
    res.render('admin', {
      title: 'Admin'
    });
  };

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
