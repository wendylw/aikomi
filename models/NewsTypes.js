var keystone = require('keystone');
var constants = require('../lib/constants');
var Types = keystone.Field.Types;

var NewsTypes = new keystone.List('NewsTypes', {
  map: { name: 'label' }
});

NewsTypes.add({
  name: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  country: {
    type: Types.Select,
    options: Object.keys(constants.COUNTRIES),
    noedit: true,
    initial: true,
    required: true
  },
  newsHistoryList: {
    type: Types.Relationship,
    ref: 'NewsHistoryList',
    many: true,
    filters: { country: ':country' },
    createInline: true,
  },
  group: {
    type: Types.Relationship, ref: 'News', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

NewsTypes.schema.pre('save', function (next) {
  this.label = `${this.name} (${this.country})`;
  next();
});

NewsTypes.relationship({ path: 'newsHistoryList', ref: 'NewsHistoryList', refPath: 'group' });

NewsTypes.defaultColumns = 'label, group, description';
NewsTypes.register();
