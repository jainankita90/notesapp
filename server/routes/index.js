var routes = require('express').Router();

routes.get('/', function(req, res){
	res.send("<h1>some error occured</h1>");
});
module.exports = routes;







// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
