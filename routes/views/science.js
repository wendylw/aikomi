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
  locals.section = 'science';

  view.on('init', function (next) {
    const q = keystone.list('Science').model.find({}).populate({
      path: 'sciencePreference',
      populate: ['sciencePreference'],
    });

    q.exec(function (err, result) {
      locals.science = result.find(item => item.country === (country || COUNTRIES.EN).toUpperCase());

      if (!locals.science) {
        locals.science = result.find(item => item.country === COUNTRIES.EN.toUpperCase());
      }

      next(err);
    });
  });

  view.on('init', function (next) {
    const q = keystone.list('Contact').model.find({});

    q.exec(function (err, result) {
      locals.contact = result.find(item => item.country === (country || COUNTRIES.EN).toUpperCase());

      if (!locals.contact) {
        locals.contact = result.find(item => item.country === COUNTRIES.EN.toUpperCase());
      }

      next(err);
    });
  });

  // Render the view
  view.render('science', {
    helpers: commonHelper
  });
};
