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

  // Set locals
  locals.section = 'contact';

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
  // locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  // locals.formData = req.body || {};
  // locals.validationErrors = {};
  // locals.enquirySubmitted = false;

  // On POST requests, add the Enquiry item to the database
  // view.on('post', { action: 'contact' }, function (next) {

  //   var newEnquiry = new Enquiry.model();
  //   var updater = newEnquiry.getUpdateHandler(req);

  //   updater.process(req.body, {
  //     flashErrors: true,
  //     fields: 'name, email, phone, enquiryType, message',
  //     errorMessage: 'There was a problem submitting your enquiry:',
  //   }, function (err) {
  //     if (err) {
  //       locals.validationErrors = err.errors;
  //     } else {
  //       locals.enquirySubmitted = true;
  //     }
  //     next();
  //   });
  // });

  view.render('contact', {
    helpers: commonHelper
  });
};
