
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
var owasp = require('owasp-password-strength-test');

var crypto = require('crypto');
var SALT_WORK_FACTOR = 10;

var setPassword = function(user) {
  console.log("=========================================")
  console.log(user)
  console.log("=========================================")
  var passwordTest = owasp.test(user.password);

  console.log(passwordTest);


  if (passwordTest.errors) {
    var error = passwordTest.errors.join(' ');
    throw new Error(error);
  } else {
    user.dataValues.salt = Crypto.randomBytes(16).toString('hex');
    user.dataValues.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  }
};



var findOrCreateUser  =  (function (condition, user){
  User.find({where: condition})
    .then(function(result){
      if (!result){
        console.log("=========================================")
        console.log("heee")
        console.log(user)
        console.log("=========================================")
         User.create(user)
            .then(function(u){
              console.log(u)
              return {u}
            })
            .catch(function(err){
            console.log(err)
              return {
              message: err
            }
        })
        }
        console.log('sdfsdf');
      })
    .catch(function (err){
      console.log(err)
      return {
        message: err
        }
    })
});



// Create the MovieSchema.
var User = sequelize.define('User',{
  username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  salt: Sequelize.STRING,
  hash: Sequelize.STRING,
},{ 
    classMethods: {
      associate: function(models) {
        User.hasMany(Note)
      },
      setPasswordtest: function(user){
        console.log ( user)    
        user.dataValues.salt = crypto.randomBytes(16).toString('hex');
        console.log ("hashing1")
        console.log("==========================")   
        console.log(user.password)
        console.log(user.salt) 
        
        console.log(crypto.pbkdf2Sync(user.username, user.salt, 1000, 64).toString('hex'))
        user.dataValues.hash = crypto.pbkdf2Sync(user.username, user.salt, 1000, 64).toString('hex'); 
        console.log ("hashing")    
      },
      CreateUser: function (cons, user){
        return findOrCreateUser(cons, user)
      }
    },

    timestamps: true,
    updatedAt: false,
    instanceMethods: {
      /**
       * Authenticate
       * @param  {[type]} user     [description]
       * @param  {[type]} password [description]
       * @return {[type]}          [description]
       */


      validPassword : function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

        return this.hash === hash;
      }
    }
  }
);

User.beforeCreate(function(user, options) {
  console.log ('beforecreate');
  console.log ("hello ") 
  console.log( user);
  User.setPasswordtest(user);

});
User.sync();
module.exports = User;
