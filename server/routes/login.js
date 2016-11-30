
//var basicAuth = require('basic-auth');

var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var redisClient = require('../config/redis_database').redisClient;
var routes = require('express').Router();
var User = require ('../models/User');
var passport = require('passport');
var createToken = function(key)	{
		return jwt.sign({id: key}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });
	};


var isLoggedIn = function(req, res, next) {
  		// if user is authenticated in the session, carry on
  		if (req.session.user)
    		return next();
  		// if they aren't redirect them to the home page
  		res.send(false);
	}


// check login status
routes.get('/status', function(req, res) {
  if (!req.session.user){
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});
  
routes.get('/profile', isLoggedIn, function(req, res) {
    res.send( {
      user : req.session.user // get the user out of session and pass to template
    });
  });


//register
routes.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/note/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


//login
routes.post('/', passport.authenticate('local-login', {
    successRedirect : '/note', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


//logout
routes.get('/', function(req, res) {	
	if (req.session.user) {
		delete req.session.user;
		return res.send(200);
	}else {
		
		return res.send(401);
	}
});

//exporting routes
module.exports = routes;
