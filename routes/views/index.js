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
  locals.section = 'home';

  view.on('init', function (next) {
    const q = keystone.list('HomePage').model.find({}).populate({
      path: 'platformAdvantages',
      populate: ['platformAdvantages'],
    });

    q.exec(function (err, result) {
      locals.home = result.find(item => item.country === (country || COUNTRIES.EN).toUpperCase());

      console.log(country);
      console.log('home===>2', locals.home);

      if (!locals.home) {
        locals.home = result.find(item => item.country === COUNTRIES.EN.toUpperCase());

        console.log('home===>1', locals.home);
      }

      next(err);
    });
  });

  // Render the view
  view.render('index', {
    helpers: commonHelper
  });
};
