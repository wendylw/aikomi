// var keystone = require('keystone');
// var Types = keystone.Field.Types;

// /**
//  * Enquiry Model
//  * =============
//  */

// var Enquiry = new keystone.List('Enquiry', {
//   nocreate: true,
//   noedit: true,
// });

// Enquiry.add({
//   name: { type: Types.Name, required: true },
//   email: { type: Types.Email, required: true },
//   address: { type: String },
//   phone: { type: String },
//   enquiryType: {
//     type: Types.Select, options: [
//       { value: 'message', label: 'Just leaving a message' },
//       { value: 'question', label: 'I\'ve got a question' },
//       { value: 'other', label: 'Something else...' },
//     ]
//   },
//   message: { type: Types.Markdown, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// Enquiry.defaultSort = '-createdAt';
// Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
// Enquiry.register();
var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * Contact Model
 * ===========
 */

var Contact = new keystone.List('Contact', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'Contact',
});

Contact.add({
  slug: {
    type: String,
    noedit: true,
    unique: true
  },
  label: {
    type: String,
    noedit: true,
    initial: false,
    unique: true
  },
  pageName: {
    label: 'Name',
    type: String,
    required: true,
    initial: true
  },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  bannerImage: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('contact/')
  },
  email: { type: Types.Email },
  address: { type: String },
  phone: { type: String },
  facebookLink: {
    type: Types.Url
  },
  twitterLink: {
    type: Types.Url
  },
  instagramLink: {
    type: Types.Url
  }
});

Contact.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Contact.defaultColumns = 'label, title';

Contact.register();