// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

// Create our Express application
var app = express();
// Create Router
var router = express.Router();

// --------------------------------
// Register routers, body-parser
// --------------------------------
// NOTE Order of bodyParser and router matters
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use('/',router);


// GET
router.get('/',function(req,res){
	res.json({message: 'Getting resposne from Vin'})

});

//USER
var userRoute = router.route('/users');

//GET
userRoute.get(function(req,res){
	User.find(function(err,users){
		if(err)
			res.send(err);
		res.json(users);
	});
});

var userRoute = router.route('/users/:id');

// GET /users/:id  /users/101
userRoute.get(function(req,res){
	//console.log('Get id',req.params.id);
	User.find({id:req.params.id},function(err,users){
		if(err)
			res.send(err);
		
		res.json(users);
	});
});

// POST

userRoute.post(function(req,res){
	//console.log('POST',req.body.name,req.body.id);
	var user = new User();
	user.name = req.body.name;
	user.id = req.body.id;
	
	user.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'User added', data:user })
	});	
});

// --------------------------------
//Connect to users MongoDB
// --------------------------------
mongoose.connect('mongodb://localhost:27017/users')

// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);