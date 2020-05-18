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
  cultureReasonTitle: {
    type: String,
  },
  cultureReason: {
    type: Types.Textarea,
    note: 'Use &lt;br\/&gt; for line feed'
  },
  challengingBehaviourTitle: {
    type: String,
  },
  cultureBehaviour: {
    type: Types.Textarea,
    note: 'Use &lt;br\/&gt; for line feed'
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