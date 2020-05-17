var keystone = require('keystone');
var commonHelper = require('../../templates/views/helpers/common');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'science';

  // Render the view
  view.render('science', {
    helpers: commonHelper
  });
};
