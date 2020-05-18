var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * HomePage Model
 * ===========
 */

var HomePage = new keystone.List('HomePage', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'HomePage',
});

HomePage.add({
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
    storage: fileStorage.storage('home/')
  },
  bannerTitle: {
    type: String
  },
  bannerDescription: {
    type: Types.Textarea
  },
  bannerLink: {
    type: Types.Url
  },
  dementiaCareTriadTitle: {
    type: Types.Html,
    wysiwyg: true
  },
  dementiaCareTriadDescription: {
    type: Types.Textarea
  },
  dementiaCareTriadImage: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('home/')
  },
  video: {
    type: String
  },
  introductionTitle: {
    type: String
  },
  introductionDescription: {
    type: Types.Html,
    wysiwyg: true
  }
});

HomePage.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

HomePage.defaultColumns = 'label, title';

HomePage.register();