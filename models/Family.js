
var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var slug = require('limax');

var Types = keystone.Field.Types;

/**
 * Family Model
 * ===========
 */

var Family = new keystone.List('Family', {
  autokey: {
    from: 'slug',
    path: 'key'
  },
  map: { name: 'label' },
  label: 'Family',
});

Family.add({
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
    storage: fileStorage.storage('family/')
  },
  becomeFamilyTitle: {
    type: String
  },
  becomeFamilySubtitle: {
    type: String
  },
  becomeFamilyLabel: {
    type: String
  },
  becomeFamilyDescription: {
    type: Types.Textarea
  },
  becomeFamilyVideoTitle: {
    type: String
  },
  becomeFamilyVideo: {
    type: String,
    note: 'Use &lt;iframe&gt;'
  },
  becomeFamilyImageI: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('family/')
  },
  becomeFamilyImageITitle: {
    type: String,
  },
  becomeFamilyImageIDescription: {
    type: Types.Textarea
  },
  becomeFamilyImageII: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('family/')
  },
  becomeFamilyImageIITitle: {
    type: String,
  },
  becomeFamilyImageIIDescription: {
    type: Types.Textarea
  },
  becomeFamilyImageIII: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('family/')
  },
  becomeFamilyImageIIITitle: {
    type: String,
  },
  becomeFamilyImageIIIDescription: {
    type: Types.Textarea
  },
  familyNameTitle: {
    type: String
  },
  familyNameDescription: {
    type: Types.Textarea
  },
  familyNameSubtitle: {
    type: String
  },
  familyNameDescription: {
    type: Types.Textarea
  },
  familyNameList: {
    type: Types.Relationship,
    ref: 'FamilyNameList',
    many: true,
    filters: { country: ':country' },
    createInline: true,
  }
});

Family.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Family.relationship({ path: 'familyNameList', ref: 'FamilyNameList', refPath: 'group' });

Family.defaultColumns = 'label, title';

Family.register();