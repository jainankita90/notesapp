var routes = require('express').Router();

routes.get('/', function(req, res){
	res.send(200);
});
module.exports = routes;







// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
