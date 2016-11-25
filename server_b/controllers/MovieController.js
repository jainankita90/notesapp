// var Resource = require('resourcejs');
// module.exports = function(app, route) {

//   // Setup the controller for REST;
//   Resource(app, '', route, app.models.movie).rest();

//   // Return middleware.
//   return function(req, res, next) {
//     next();
//   };
// };


var restful = require('node-restful');

module.exports = function(app, route){
	// setup controller for rest
	var rest = restful.model(
		'movie',
		app.models.movie
		).methods(['get', 'put', 'post', 'delete']);
	rest.register(app, route);

    console.log('inside controller');
	//return to middleware
	return function (req, res, next){
		next();

	};
};