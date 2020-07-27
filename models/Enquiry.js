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
  aboutUsLink: {
    type: Types.Url
  },
  servicesLink: {
    type: Types.Url
  },
  faqLink: {
    type: Types.Url
  },
  blogLink: {
    type: Types.Url
  },
  facebookLink: {
    type: Types.Url
  },
  twitterLink: {
    type: Types.Url
  },
  instagramLink: {
    type: Types.Url
  },
  linkedInLink: {
    type: Types.Url
  },
});

Contact.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Contact.defaultColumns = 'label, title';

Contact.register();