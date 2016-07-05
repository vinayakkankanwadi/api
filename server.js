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

// POST
userRoute.post(function(req,res){
	console.log('POST',req.body.name,req.body.id);
	var user = new User();
	user.name = req.body.name;
	user.id = req.body.id;
	
	user.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'User added', data:user })
	});	
});

//GET
userRoute.get(function(req,res){
	console.log('GET');
	User.find(function(err,users){
		if(err)
			res.send(err);
		res.json(users);
	});
});


// GET /users/:id  /users/101
var userRoute = router.route('/users/:id');

userRoute.get(function(req,res){
	console.log('Get id',req.params.id);
	User.find({id:req.params.id},function(err,users){
		if(err)
			res.send(err);
		
		res.json(users);
	});
});

// PUT
userRoute.put(function(req,res){
	console.log('PUT',req.params.id,req.body.newname);

	User.update({id:req.params.id},{$set: {name:req.body.newname}},function(err){
		//users.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'user updated',data:req.params.id});
	});
});

// DELETE

userRoute.delete(function(req,res){
	console.log('DELETE',req.params.id);
	
	User.remove({id:req.params.id},function(err){
		if(err)
			res.send(err);
		res.json({message:'user removed'});
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