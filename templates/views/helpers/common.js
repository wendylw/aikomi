var moment = require('moment');
var i18n = require('i18n');

module.exports = {
  getNavActive(activeSection, section) {
    return activeSection === section;
  },

  formatDate(time, formatString) {
    return moment(time).format(formatString);
  },

  getLanguageItem(country) {
    if (country.toUpperCase() === 'EN') {
      return 'JP';
    } else {
      return 'EN';
    }
  },

  getOtherLanguageLink(url, country) {
    if (country.toUpperCase() === 'EN') {
      return (url.replace('/jp', '') + '/jp');
    } else {
      return url.replace('/jp', '');
    }
  },

  __e: function () {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();

    return i18n.__.apply(options.data.root, args);
  },
}
