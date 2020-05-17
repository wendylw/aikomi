var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * Company Model
 * ===========
 */

var Company = new keystone.List('Company', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'Company',
});

Company.add({
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
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  cultureTitle: {
    type: String
  },
  cultureReason: {
    type: Types.Textarea
  },
  cultureBehaviour: {
    type: Types.Textarea
  },
  challengingBehaviourDescription: {
    type: Types.Textarea
  },
  dementiaCareTriadTitle: {
    type: String
  },
  dementiaCareTriadSubTitle: {
    type: Types.TextArray,
    separator: '|'
  },
  dementiaCareTriadDescription: {
    type: Types.Textarea
  },
  conceptTitle: {
    type: String
  },
  conceptDescription: {
    type: Types.Textarea
  },
  aboutUsHistory: {
    type: Types.Html,
    wysiwyg: true
  },
  aboutUsCorporateDetail: {
    type: Types.Html,
    wysiwyg: true
  },
});

Company.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Company.defaultColumns = 'label, title';

Company.register();