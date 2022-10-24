/**
 * GET /shortener
 * Shortener page.
 */
 exports.index = (req, res) => {
    console.log('meow');
    res.render('shortener', {
      title: 'Shortener'
    });
  };
  