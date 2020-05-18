const COUNTRIES_LANGUAGES = [
  {
    country: 'EN'
  },
  {
    country: 'JP'
  }
];

const COUNTRIES = function () {
  let countries = {};

  COUNTRIES_LANGUAGES.forEach(item => {
    countries[item.country] = item.country;
  });

  return countries;
};

exports.COUNTRIES = COUNTRIES();