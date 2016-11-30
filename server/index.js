var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var redis   = require("redis");

var _ = require('lodash');
var passport = require('passport');
var flash = require('connect-flash')
var session      = require('express-session');
var redisStore = require('connect-redis')(session);

var secretkey = require('./config/secret');
var client  = redis.createClient();

// Load the routes.
var routes = require('./routes/index');
var note = require('./routes/note');
var login = require('./routes/login');



// Create the application.
var app = express();

  
// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//passport settings
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
//    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));
app.u
app.use(flash());
//has to be done session and flash
require('./config/passport')(passport);



// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

  var db = require('./config/mongoose');

// Load the models.
//app.models = require('./models/index');
app.use('/',routes);
app.use('/user/',login);
app.use('/note/',note);




console.log('Listening on port 3000...');
app.listen(3000);

