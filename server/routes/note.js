var routes = require('express').Router();
var Note = require('../models/Notes');
var jwt = require('express-jwt');
var secret = require('../config/secret');


var publicFields = '_id title url tags content created likes';

routes.get('/',function(req, res) {

	console.log(req.user);
	var query = Note.find({});

	//query.select(publicFields);
	//query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
  		return res.json(200, results);
	});
});

//only if admin
routes.get('/all',function(req, res) {
	/*if (!req.user) {
		return res.send(401);
	}*/

	var query = Note.find();
	//query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		return res.json(200, results);
	});
});

routes.post('/add',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/  
	var note = req.body.note;
	if (note == null || note.sub == null || note.desc == null) {
		return res.send(400);
	}

	var NoteEntry = new Note();
	NoteEntry.sub = note.sub;
	NoteEntry.desc = note.desc


	//lateron have plan to make is_active false and add new entry in note. That will easy for cleanup
    
	NoteEntry.save(function(err) {
		//if (err) {
			console.log(err);
	//		return res.send(400);
	//	}

		return res.send(200);
	});
});



routes.get('/:id',function(req, res) {
// add authentication
console.log (req.params)
	var id = req.params.id || '';
	if (id == '') {
		return res.send(400);
	}

	var query = Note.findById(id);
	//query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  				return res.json(200, result);
	
	});
});

routes.get('/add',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/
	var note = req.body.note;
	if (note == null || note.sub == null || post.desc == null) {
		return res.send(400);
	}

	var NoteEntry = new Note();
	NoteEntry.sub = note.title;
	NoteEntry.desc = note.desc


	//lateron have plan to make is_active false and add new entry in note. That will easy for cleanup
    console.log("saving NoteEntry-==="+NoteEntry)
	NoteEntry.save(function(err) {
		//if (err) {
			console.log(err);
	//		return res.send(400);
	//	}

		return res.send(200);
	});
});


routes.get('/delete/:id',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/
	console.log ('delete')
	console.log(req.params)

	var id = req.params.id;
	if (id == null || id == '') {
		res.send(400);
	} 

	var query = Note.findOne({_id:id});

	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		if (result = null) {
			return res.send(400);}
		else{

			Note.update({'_id':id}, {'$set': {'is_active': false}},function(err, nbRows, raw) {
			console.log(err)
			console.log(nbRows)
			console.log(raw)
			return res.send(200);
			});
		};	
	});
});



routes.post('/edit/:id',function(req, res) {
/*	if (!req.user) {
		return res.send(401);
	}
*/
	var note = req.body.note;
	note.id = req.params.id;

	if (note == null || note.id == null) {
		console.log('bad request' + req.params.id )
		res.send(400);
	}

	var updateNote = {};
//modify this part of code sub cannot be modified
	//if (note.sub != null && note.sub!= "") {//
//		updatePost.title = note.title;
	//} 

	if (note.desc != null) {
		
			updateNote.desc = note.desc;
		}
	else{
		updateNote.desc = 'dfd';
	}	
	updateNote.updated = new Date();
 
   //as of now only updating version 
    

    console.log(updateNote, note.id)
	Note.update({_id: note.id}, updateNote, function(err, nbRows, raw) {
		console.log(err)
		console.log(nbRows)
		console.log(raw)
		return res.send(200);
	});
});

 
module.exports = routes;
