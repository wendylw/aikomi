var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var Types = keystone.Field.Types;

var CompanyPartners = new keystone.List('CompanyPartners', {
  map: { name: 'label' }
});

CompanyPartners.add({
  title: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  image: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('company/')
  },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  group: {
    type: Types.Relationship, ref: 'Company', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

CompanyPartners.schema.pre('save', function (next) {
  this.label = `${this.title} (${this.country})`;
  next();
});

CompanyPartners.defaultColumns = 'label, group';
CompanyPartners.register();