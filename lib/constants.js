const COUNTRIES_LANGUAGES = [
	{
		country: 'EN'
	},
	{
		country: 'CN'
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