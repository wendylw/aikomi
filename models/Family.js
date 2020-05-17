
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
  }
});

Contact.schema.pre('save', function (next) {
  this.label = `${this.pageName} (${this.country})`;
  this.slug = slug(`${this._id}-(${this.country})`);
  next();
});

Contact.defaultColumns = 'label, title';

Contact.register();