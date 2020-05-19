var keystone = require('keystone');
var constants = require('../lib/constants');
var Types = keystone.Field.Types;

var RecentNewsList = new keystone.List('RecentNewsList', {
  map: { name: 'label' }
});

RecentNewsList.add({
  title: {
    type: String,
    initial: true,
    required: true
  },
  label: { type: String, noedit: true, initial: false, unique: true },
  publicDate: {
    type: Types.Date,
    inputFormat: 'DD-MM-YYYY',
  },
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
    type: Types.Relationship, ref: 'News', many: false,
    filters: { country: ':country' }, initial: true, required: true,
  },
});

RecentNewsList.schema.pre('save', function (next) {
  this.label = `${this.title} (${this.country})`;
  next();
});

RecentNewsList.defaultColumns = 'label, group, description';
RecentNewsList.register();
