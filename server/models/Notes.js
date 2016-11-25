var mongoose = require('mongoose');

// Create the NoteSchema.
var NoteSchema = new mongoose.Schema({
  username : {'type': String, default:'ankita'},	
  sub: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  is_active: {type: Boolean, default: true}  
});

// Export the model schema.
NoteSchema.methods.findbyUsername = function(username){
	notes = Note.find({username: this.username, is_active: true}, function(err, doc){
		if (!err){
			doc}
	});
}


var Note = mongoose.model('notes',NoteSchema);
module.exports = Note;



