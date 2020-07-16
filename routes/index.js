/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var i18n = require("i18n");
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Add-in i18n support
keystone.pre('routes', i18n.init);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.setLocale);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/company/:country?', middleware.processCountryLanguage({ path: 'company' }), routes.views.company);
  app.get('/family/:country?', middleware.processCountryLanguage({ path: 'family' }), routes.views.family);
  app.get('/news/:country?', middleware.processCountryLanguage({ path: 'news' }), routes.views.news);
  app.get('/science/:country?', middleware.processCountryLanguage({ path: 'science' }), routes.views.science);
  app.all('/contact/:country?', middleware.processCountryLanguage({ path: 'contact' }), routes.views.contact);
  app.get('/:country?', middleware.processCountryLanguage({ path: '' }), routes.views.index);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

};
