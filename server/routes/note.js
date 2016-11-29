var routes = require('express').Router();
var Note = require('../models/Notes');
var User = require('../models/User');
var errorHandler = require('../controllers/errorhandler');
//var jwt = require('express-jwt');
var secret = require('../config/secret');


var publicFields = '_id title url tags content created likes';

routes.get('/',function(req, res) {
	
	var username = req.headers.username;
	//finding notes based on username/id
	Note.findAll()//{'username': req.headers.username})
	.then(function(notes){
		return res.json(notes);
	})
	.catch(function(err) {
    	return res.status(400).send({
      	message: errorHandler.getErrorMessage(err)
    	})
 	});
});

routes.get('/create',function(req, res){
  
})


routes.post('/add',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/
 	var username = req.headers.username;
	console.log(req.headers.username)
	console.log(username)

	var note = req.body.note;
	console.log(note)
	if (note == null || note.sub == null || note.desc == null) {
		return res.send(400);
	}
	note.username = username;

	Note.create(note)
  	.then(function(note) {
    	return res.json(note);
  	})
  	.catch(function(err) {
    	return res.status(400).send({
      		message: errorHandler.getErrorMessage(err)
    	});
  	});
});


routes.get('/:id',function(req, res) {
// add authentication
  var username = req.headers.username;
  
  var id = req.params.id || '';
  if (id == '') {
    return res.send(400);
  }
console.log ("reoute.get "+id)
  Note.find({where:{'identifier': id}})//, 'username': username})
  .then(function(notes){  
    console.log(notes)  
    return res.json(notes);
  })
  .catch(function(err) {
    console.log(err)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
  });
});


routes.delete("/:id", function (req, res){
  console.log("------------delete called-------------------")

});


routes.get('/delete/:id',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/
	var username = req.headers.username;
	var id = req.params.id;
	if (id == null || id == '') {
		res.send(400);
	} 

	var query = Note.findOne();

	Note
    .findOne({
      where: {'identifier':id, 'username': username},
      include: [
        //db.User
      ]
    })
    .then(function(note) {      
      note.destroy()
        .then(function() {
          return res.json(note);
        })
        .catch(function(err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        });

      return null;
    })
    .catch(function(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
});

routes.put('/edit/:id',function(req, res) {
/*	if (!req.user) {		return res.send(401);	}*/
	var note = req.body.note;

  console.log("params" )
  console.log( note)
	note.id = req.params.id;

	if (note == null || note.id == null) {
		console.log('bad request' + req.params.id )
		res.send(400);
	}

	var updateNote={}
	if (note.desc != null) {
			updateNote.desc = note.desc;
		}
	
		
	updateNote.updatedAt = new Date();
	//_v pending

	console.log(updateNote)
  Note
    .findOne({
      where: {
        identifier: note.id
      },
      include: [
        //User
      ]
    })
    .then(function(note) {
      note.updateAttributes(updateNote)
      	.then(function() {
        	return res.json(note);
      	})
      	.catch(function(err) {
      		console.log(err);
        	return res.status(400).send({
          	message: errorHandler.getErrorMessage(err)
        	});
      	});

      	return null;
    })
    .catch(function(err) {

    	console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
});


//only if admin
/*
routes.get('/all',function(req, res) {
	/*if (!req.user) {
		return res.send(401);
	

	Note.find({'username': req.headers.username})
	.then(function(notes){
		return res.json(200, notes);
	})
	.catch(function(err) {
    	return res.status(400).send({
      	message: errorHandler.getErrorMessage(err)
    	})
 	});
});*/
 
module.exports = routes;
