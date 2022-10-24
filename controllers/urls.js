/**
 * GET /
 * URLs page.
 */
 exports.index = (req, res) => {
    res.render('urls', {
      title: 'URLs'
    });
  };
  
  exports.getURL = (req, res) => {
    // TODO: Add logic for checking the database to see if route exists
    // TODO: Add logic for shortening the route
    // TODO: Add logic for storing in the database
    res.json({"route": "www.google.com"})
  }