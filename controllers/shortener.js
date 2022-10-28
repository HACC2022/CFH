/**
 * GET /shortener
 * Shortener page.
 */
 exports.index = (req, res) => {
    res.render('shortener', {
      title: 'Shortener'
    });
  };
  