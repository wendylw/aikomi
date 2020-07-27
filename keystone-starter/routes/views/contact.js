var keystone = require('keystone');
var Subscribes = keystone.list('Subscribes');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	// locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.subscribeSubmitted = false;

	// On POST requests, add the Enquiry item to the database
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

	view.render('contact');
};
