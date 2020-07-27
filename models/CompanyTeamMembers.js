var keystone = require('keystone');
var constants = require('../lib/constants');
var fileStorage = require('./common-util/file-storage');
var Types = keystone.Field.Types;

var CompanyTeamMembers = new keystone.List('CompanyTeamMembers', {
  map: { name: 'label' }
});

CompanyTeamMembers.add({
  title: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  name: {
    type: String,
  },
  image: {
    type: Types.File,
    thumb: true,
    storage: fileStorage.storage('company/')
  },
  description: {
    type: Types.Textarea
  },
  isScientificAdvisors: {type: Types.Boolean},
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

CompanyTeamMembers.schema.pre('save', function (next) {
  this.label = `${this.title} (${this.country})`;
  next();
});

CompanyTeamMembers.defaultColumns = 'label, group, description';
CompanyTeamMembers.register();
