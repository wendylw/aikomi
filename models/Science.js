var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * Science Model
 * ===========
 */

var Science = new keystone.List('Science', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'Science',
});

Science.add({
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
    storage: fileStorage.storage('science/')
  },
  bannerTitle: {
    type: String
  },
  bannerDescription: {
    type: Types.Textarea
  },
  challengingBehaviourImageI: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('science/')
  },
  challengingBehaviourImageIText: {
    type: String
  },
  challengingBehaviourImageII: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('science/')
  },
  challengingBehaviourImageIIText: {
    type: String
  },
  challengingBehaviourImageIII: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('science/')
  },
  challengingBehaviourImageIIIText: {
    type: String
  },
  challengingBehaviourTitle: {
    type: String
  },
  challengingBehaviourSubtitle: {
    type: String
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
  dementiaCareTriadImage: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('science/')
  },
  conceptTitle: {
    type: String
  },
  conceptDescription: {
    type: Types.Textarea
  },
});

Science.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Science.defaultColumns = 'label, title';

Science.register();