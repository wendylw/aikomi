var keystone = require('keystone');
var commonHelper = require('../../templates/views/helpers/common');
var constants = require('../../lib/constants');

const {
  COUNTRIES
} = constants;

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;
  var { country } = locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'company';

  view.on('init', function (next) {
    const q = keystone.list('Science').model.find({});

    q.exec(function (err, result) {
      locals.company = result.find(item => item.country === (country || COUNTRIES.EN).toUpperCase());

      if (!locals.company) {
        locals.company = result.find(item => item.country === COUNTRIES.EN.toUpperCase());
      }

      next(err);
    });
  });

  // Render the view
  view.render('company', {
    helpers: commonHelper
  });
};
