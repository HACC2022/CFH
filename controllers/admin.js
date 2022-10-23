/**
 * GET /
 * Admin page.
 */
 exports.index = (req, res) => {
    res.render('admin', {
      title: 'Admin'
    });
  };
  