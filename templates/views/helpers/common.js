var moment = require('moment');

module.exports = {
  getNavActive(activeSection, section) {
    return activeSection === section;
  },

  formatDate(time, formatString) {
    return moment(time).format(formatString);
  },
}
