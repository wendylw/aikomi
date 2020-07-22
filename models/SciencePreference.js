var keystone = require('keystone');
var constants = require('../lib/constants');
var Types = keystone.Field.Types;

var SciencePreference = new keystone.List('SciencePreference', {
  map: { name: 'label' }
});

SciencePreference.add({
  referenceName: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  description: {
    type: Types.Textarea
  },
  linkText: {
    type: String
  },
  linkUrl: {
    type: Types.Url
  },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  group: {
    type: Types.Relationship, ref: 'Science', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

SciencePreference.schema.pre('save', function (next) {
  this.label = `${this.referenceName} (${this.country})`;
  next();
});

SciencePreference.defaultColumns = 'label, group, description';
SciencePreference.register();
