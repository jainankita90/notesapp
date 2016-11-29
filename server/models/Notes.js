//var sequelize = require('../config/mongoose');



var Sequelize = require('sequelize');
var sequelize = new Sequelize('meanapp', 'node', 'node', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  
});

var Note = sequelize.define('Note',{
  username :  Sequelize.STRING,
  sub: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  identifier: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},

},{
  classMethods: {
    associate: function(models) {
    Note.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

Note.sync();
module.exports = Note;



/*var mongoose = require('mongoose');

// Create the NoteSchema.
var NoteSchema = new mongoose.Schema({
  username : {'type': String},	
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
NoteSchema.methods.findbyUsername = function(user){
	notes = Note.find({username: user, is_active: true}, function(err, doc){
		if (!err){
			return doc}
	});
}


var Note = mongoose.model('notes',NoteSchema);
module.exports = Note;


*/


