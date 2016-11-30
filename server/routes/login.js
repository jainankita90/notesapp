//var basicAuth = require('basic-auth');

var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken');

var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');
var routes = require('express').Router();


var User = require ('../models/User');

routes.get('/status', function(req, res) {
  if (1) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

routes.post('/create', function(req, res){
	var username = req.body.username || '';
	var password = req.body.password || '';
	var passwordConfirmation = req.body.passwordConfirmation || '';

	if (username == '' || password == '' || password != passwordConfirmation) {
		return res.status(401).send({
      	message: "please check username and pass"
    	})
	}
    console.log('username  :'+ username)
	var newUser = {};
	newUser.username = username;
	newUser.password = password;

	return res.send(User.CreateUser({'username':username}, newUser))
// finding user, if doesnot 
/*exist, create user
	User.find({where: {username: username}})
    .then(function(result){
      if (!result){
      	console.log(result);
      	console.log(newUser);
        User.create(newUser)
        .then(function(user){
        	console.log(user)
          return res.status(200).send(user)
        })
        .catch(function(err){
        	console.log(err)
          return res.status(400).send({
            message: err
          })
        });
      }
    })
    .catch(function (err){
    	console.log(err)
      return res.status(400).send({
        message: err
        });
    });*/
});


routes.post('/',function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	console.log('reached ------------login')
	if (username == '' || password == '') { 
		return res.status(401).json({message: 'Please fill out all fields'});
	}
    //db.userModel.setPassword(password);
	User.findOne({where: {username: username}})
	.then(function (user) {
		console.log("hellouser"+ user==undefined )
		console.log("hellov"+ user.validPassword(username))
		if (user == undefined) {
			return res.status(401).json({message: 'Please enter valid credentials'});
		}
		if(!user.validPassword(password)) {
			return res.status(401).json({message: 'Please enter valid credentials'});
		}
		var token = jwt.sign({id: username}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });
		console.log(token)
		return res.json({token:token});
	})
	.catch(function(err){
		console.log(err);
		return res.status(401).json({message: 'Please enter valid credentials'});
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


// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
