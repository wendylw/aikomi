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

  getOtherLanguageLink(url, country, isSwitch) {
    var urlList = url ? url.split('/').filter(path => Boolean(path)) : [];

    if ((country.toUpperCase() === 'EN' && !url.includes('jp') && isSwitch) || (country.toUpperCase() === 'JP' && !url.includes('jp') && !isSwitch)) {
      urlList.push('jp');
    } else if ((country.toUpperCase() === 'JP' && isSwitch) || (country.toUpperCase() === 'EN' && !isSwitch)) {
      urlList = urlList.filter(u => u !== 'jp');
    }

    console.log(`/${urlList.join('/')}`);

    return `/${urlList.join('/')}`;
  },

  __e: function () {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();

    return i18n.__.apply(options.data.root, args);
  },
}
