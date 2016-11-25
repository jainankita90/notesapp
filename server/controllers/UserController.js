/*var User = require('mongoose').model('user');

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};*/

module.exports = function(app, route) {

  /*// Setup the controller for REST.
  var rest = restful.model(
    'movie',
    app.models.movie
  ).methods(['get', 'put', 'post', 'delete']);

  // Register this endpoint with the application.
  rest.register(app, route);
*/
  // Return middleware.
  return function(req, res, next) {
  	res.send('Haha')
    next();
  };
};
