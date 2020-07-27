var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subscribes Model
 * =============
 */

var Subscribes = new keystone.List('Subscribes', {
  nocreate: true,
  noedit: true,
});

Subscribes.add({
  email: { type: Types.Email, required: true },
  createdAt: { type: Date, default: Date.now },
});

Subscribes.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Subscribes.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Subscribes.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	// if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	// 	console.log('Unable to send email - no mailgun credentials provided');
	// 	return callback(new Error('could not find mailgun credentials'));
	// }

	// var enquiry = this;
	// var brand = keystone.get('brand');

	// keystone.list('Subscribes').model.find().exec(function (err) {
	// 	if (err) return callback(err);
	// 	new keystone.Email({
	// 		templateName: 'enquiry-notification',
	// 		transport: 'mailgun',
	// 	}).send({
	// 		from: {
	// 			email: 'contact@keystone-starter.com',
	// 		},
	// 		subject: 'New Subscribes for keystone-starter',
	// 		enquiry: enquiry,
	// 		brand: brand,
	// 	}, callback);
	// });
};

Subscribes.defaultSort = '-createdAt';
Subscribes.defaultColumns = 'email, createdAt';
Subscribes.register();