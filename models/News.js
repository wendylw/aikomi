var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * News Model
 * ===========
 */

var News = new keystone.List('News', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'News',
});

News.add({
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
    storage: fileStorage.storage('news/')
  },
  recentNewsList: {
    type: Types.Relationship,
    ref: 'RecentNewsList',
    many: true,
    filters: { country: ':country' },
    createInline: true,
  },
  newsTypes: {
    type: Types.Relationship,
    ref: 'NewsTypes',
    many: true,
    filters: { country: ':country' },
    createInline: true,
  }
});

News.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

News.relationship({ path: 'recentNewsList', ref: 'RecentNewsList', refPath: 'group' });
News.relationship({ path: 'newsTypes', ref: 'NewsTypes', refPath: 'group' });

News.defaultColumns = 'label, title';

News.register();