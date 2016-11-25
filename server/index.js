var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
//mongoose.connect('mongodb://localhost/meanapp');
//mongoose.connection.once('open', function() {
  var db = require('./config/mongoose');

  // Load the models.
  //app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes/index');
  var note = require('./routes/note');
  var login = require('./routes/login');

  //_.each(routes, function(controller, route) {
  //  console.log("Anupam::"+route);
  //  app.use(route, controller(app, route));
  //});
  app.use('/',routes);
  app.use('/login',login);
  app.use('/note',note);
  console.log('Listening on port 3000...');
  app.listen(3000);

