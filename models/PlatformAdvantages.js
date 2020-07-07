var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var Types = keystone.Field.Types;

var PlatformAdvantages = new keystone.List('PlatformAdvantages', {
  map: { name: 'label' }
});

PlatformAdvantages.add({
  title: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  image: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('home/')
  },
  description: {
    type: Types.Textarea
  },
  url: {
    type: String,
  },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  group: {
    type: Types.Relationship, ref: 'HomePage', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

PlatformAdvantages.schema.pre('save', function (next) {
  this.label = `${this.title} (${this.country})`;
  next();
});

PlatformAdvantages.defaultColumns = 'label, group, description';
PlatformAdvantages.register();
