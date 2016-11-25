/*var routes = require('express').Router();
var Movie = require('./models/Movie');
routes.get('/movie', (req, res) => {
  
  var movie = Movie.findOne({},function(err, doc){
  	console.log(doc)
   res.send(
            (err === null) ? { msg: doc } : { msg: err }

        );	
  //console.log(movie);
  //res.send("anupam");
});
  		
 // });


  //JSON.stringify(movie, test);
  
  //res.status(200).json({ message: 'Connected!' });
});


routes.get('/login', function(req, res){
	res.send('this is login page');
});
module.exports = routes;







// module.exports = {
 // '/movie': require('./controllers/MovieController'),
//  '/user' : require('./controllers/UserController')
//};
*/