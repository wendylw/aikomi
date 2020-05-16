var geoip = require('geoip-lite');
var keystone = require('keystone');
var constants = require('./constants');

const {
  COUNTRIES
} = constants;

exports.getCountry = function (req) {
  var requestIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
  var currentCountries = Object.keys(COUNTRIES).map(item => item.toLowerCase());

  //in case it has gone through multiple proxies, should get the first IP as the client IP
  if (requestIp) {
    requestIp = requestIp.split(',')[0];
  }

  var countryList = geoip.lookup(requestIp) || COUNTRIES.EN;
  var country = req.params.country || (countryList.country || COUNTRIES.EN).toLowerCase();

  return currentCountries.includes(country) ? country : COUNTRIES.EN;
}

exports.filterKeystoneListResult = function (keystoneList, options) {
  if (!keystoneList) {
    return null;
  }

  if (options) {
    return keystoneList.model.findOne(options);
  }

  return keystoneList.model.find();
}

exports.getKeystoneList = function (keystoneListName, prefix) {
  if (!keystoneListName) {
    return null;
  }

  prefix = prefix ? (prefix.toUpperCase() + '_') : '';

  return keystone.list(`${prefix}${keystoneListName}`);
}