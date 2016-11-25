//var basicAuth = require('basic-auth');

var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken');

var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');
var routes = require('express').Router();
/*
var auth = function (req, res, next){
  function unauthorized(res) {
  	res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };
  
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

   userdata = User.findOne({'user': user.name, 'pass': user.pass, 'isactive'= true});
  if (userdata) {
  	req.user = user;

  	
  	//console.log("user id " + req.session.user_id);
    return next();
  } else {
    return unauthorized(res);
  };
};

*/


var User = require ('../models/User');


routes.post('/create', function(req, res){
	console.log(req.body.username);
	console.log(req.body.password);
var username = req.body.username || '';
	var password = req.body.password || '';
	var passwordConfirmation = req.body.passwordConfirmation || '';

	if (username == '' || password == '' || password != passwordConfirmation) {
		return res.send(401);
	}
console.log('username  :'+ username)
	var newUser = new User();
	newUser.username = username;
	newUser.setPassword(password);
	newUser.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(500);
		}
	
		User.count(function(err, counter) {
			if (err) {
				console.log(err);
				return res.send(500);
			}

			if (counter == 1) {
				User.update({username:newUser.username}, {is_admin:true}, function(err, nbRow) {
					if (err) {
						console.log(err);
						return res.send(500);
					}

					console.log('First user created as an Admin');
					return res.send(200);
				});
			}
			else {
				console.log("User create=============================");
				return res.send(200);
			}
		});
	});
});
routes.post('/',function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';

	if (username == '' || password == '') { 
		return res.status(401).json({message: 'Please fill out all fields'});
	}
    //db.userModel.setPassword(password);
	User.findOne({username: username}, function (err, user) {
		if (err) {
			console.log(err);
			return res.status(401).json({message: 'Please enter valid credentials'});
		}
		if (user == undefined) {
			return res.status(401).json({message: 'Please enter valid credentials'});
		}
		if(!user.validPassword(password)) {
			return res.status(401).json({message: 'Please enter valid credentials'});
		}
		var token = jwt.sign({id: user._id}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });
		return res.json({token:token});
	});
});

routes.get('/logout', function(req, res) {
	console.log("logged user" + req.user);
	if (req.user) {
		tokenManager.expireToken(req.headers);
		delete req.user;
		return res.send(200);
	}
	else {
		return res.send(401);
	}
});
module.exports = routes;

/*	newUser.title = post.user;
	newuSer.tags = post.tags.split(',');
	newuSer.is_published = post.is_published;
	newuSer.content = post.content;

	newuSer.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});

	)



routes.post('/', auth, function(req, res){
	console.log("req id "+ req.headers.user);
	
	res.redirect('/movie', req.user);
	res.send('this is login page');
});


*/





// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
