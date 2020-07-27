var keystone = require('keystone');
var commonHelper = require('../../templates/views/helpers/common');
var constants = require('../../lib/constants');
var Subscribes = keystone.list('Subscribes');

const {
  COUNTRIES
} = constants;

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;
  var { country } = locals;

  // Set locals
  locals.section = 'contact';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.subscribeSubmitted = false;

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

  //On POST requests, add the Subscribes item to the database
  view.on('post', { action: 'contact' }, function (next) {
    var newSubscribes = new Subscribes.model();
    var updater = newSubscribes.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true,
      fields: 'email',
      errorMessage: 'There was a problem submitting your subscribe:',
    }, function (err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        locals.subscribeSubmitted = true;
      }
      next();
    });
  });

  view.render('contact', {
    helpers: commonHelper
  });
};
