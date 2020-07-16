var moment = require('moment');
var i18n = require('i18n');

module.exports = {
  getNavActive(activeSection, section) {
    return activeSection === section;
  },

  formatDate(time, formatString) {
    return moment(time).format(formatString);
  },

  __e: function () {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();

    return i18n.__.apply(options.data.root, args);
  },
}
