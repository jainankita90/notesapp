var routes = require('express').Router();

routes.get('/', function(req, res){
	res.send('this is home page');
});
module.exports = routes;







// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
