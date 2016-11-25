var mongoose = require('mongoose');

var crypto = require('crypto');
var SALT_WORK_FACTOR = 10;

// Create the MovieSchema.
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  is_admin: {
  	type: String,
  	default : false
  },
  created_at:{
  	type:Date,
  	default: Date.now
  },
  salt: String,
  hash: String,
});


UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

// Export the model schema.
/*module.exports = UserSchema;*/
var User = mongoose.model('User', UserSchema);
module.exports = User;



/*var Post = new Schema({
    title: { type: String, required: true },
    tags: [ {type: String} ],
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    read: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});*/