var keystone = require('keystone');
var constants = require('../lib/constants');
var Types = keystone.Field.Types;

var FamilyNameList = new keystone.List('FamilyNameList', {
  map: { name: 'label' }
});

FamilyNameList.add({
  title: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  description: {
    type: Types.Textarea
  },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  group: {
    type: Types.Relationship, ref: 'Family', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

FamilyNameList.schema.pre('save', function (next) {
  this.label = `${this.title} (${this.country})`;
  next();
});

FamilyNameList.defaultColumns = 'label, group, description';
FamilyNameList.register();
