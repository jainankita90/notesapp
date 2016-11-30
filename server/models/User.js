
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
  
  var passwordTest = owasp.test(user.password);



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

         User.create(user)
            .then(function(u){
              return {u}
            })
            .catch(function(err){
              return {
              message: err
            }
        })
        }

      })
    .catch(function (err){

      return {
        message: err
        }
    })
});



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
            
        user.dataValues.salt = crypto.randomBytes(16).toString('hex');
        
        
        
        user.dataValues.hash = crypto.pbkdf2Sync(user.username, user.dataValues.salt, 1000, 64).toString('hex'); 
        
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
        console.log(password);
        console.log(this.dataValues)
        var hash = crypto.pbkdf2Sync(password, this.dataValues.salt, 1000, 64).toString('hex');

        return this.dataValues.hash === hash;
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
