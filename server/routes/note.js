var routes = require('express').Router();
var Note = require('../models/Notes');
var User = require('../models/User');
var errorHandler = require('../controllers/errorhandler');
//var jwt = require('express-jwt');
var secret = require('../config/secret');


routes.get('/',function(req, res) {
	if (!req.session.user) {
    return res.send(401);
  }
	var username = req.session.user;
	//finding notes based on username/id
	Note.findAll({'where':{'username': username}})
	.then(function(notes){
		return res.json(notes);
	})
	.catch(function(err) {
    	return res.status(400).send({
      	message: errorHandler.getErrorMessage(err)
    	})
 	});
});

routes.post('/',function(req, res) {
	if (!req.session.user) {
		return res.send(401);
	}

 	var username = req.session.user;
	var note = req.body;
  console.log(note)
  console.log(note.sub)
  console.log(note.desc)
	
	if (note == null || note.sub == null || note.desc == null) {
		return res.send(400);
	}
  console.log("came down")
	note.username = username;

	Note.create(note)
  	.then(function(note) {
    	return res.json(note);
  	})
  	.catch(function(err) {
      console.log(err)
    	return res.status(400).send({

      		message: errorHandler.getErrorMessage(err)
    	});
  	});
});


routes.get('/:id',function(req, res) {
// add authentication
  if (!req.session.user) {
    return res.send(401);
  }

  var username = req.session.user;
  
  
  var id = req.params.id || '';
  if (id == '') {
    return res.send(400);
  }

  Note.find({where:{'identifier': id}})//, 'username': username})
  .then(function(notes){      
    return res.json(notes);
  })
  .catch(function(err) {

      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
  });
});



routes.delete('/:id',function(req, res) {
	if (!req.user) {
		return res.send(401);
	}


  if (!req.session.user) {
    return res.send(401);
  }

  var username = req.session.user;
	var id = req.params.id;

  
	if (id == null || id == '') {
		res.send(400);
	} 

	Note
    .findOne({
      where: {'id':id, 'username': username},
//      include: [
        //db.User
//      ]
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

routes.put('/:id',function(req, res) {

  if (!req.session.user) {
    return res.send(401);
  }

  var username = req.session.user;
  var note = {}//req.body.note;
  note.id = req.params.id;
  note.desc = req.body.desc

  if (note == null || note.id == null) {
    
    res.send(400);
  }

  var updateNote={}
  updateNote.updatedAt = new Date();
  updateNote.identifier = note.id
  
  if (note.desc != null) {
      updateNote.desc = note.desc;
    }
  

  
  Note
    .findOne({
      where: {
        id: note.id
      },
//      include: [
        //User
  //    ]
    })
    .then(function(cnote) {
      updateNote._v = cnote._v + 1;
      cnote.updateAttributes(updateNote)
        .then(function() {
  
          return res.json(cnote);
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
 
module.exports = routes;
