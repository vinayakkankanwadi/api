// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Data = require('./models/data');

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

//DATA
var dataRoute = router.route('/data');

// POST
dataRoute.post(function(req,res){
	console.log('POST',req.body.name,req.body.id);
	var da = new Data();
	da.name = req.body.name;
	da.id = req.body.id;
	
	da.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'Data added', data:da })
	});	
});

//GET
dataRoute.get(function(req,res){
	console.log('GET');
	Data.find(function(err,da){
		if(err)
			res.send(err);
		res.json(da);
	});
});


// GET /data/:id  /data/101
var dataRoute = router.route('/data/:id');

dataRoute.get(function(req,res){
	console.log('Get id',req.params.id);
	Data.find({id:req.params.id},function(err,da){
		if(err)
			res.send(err);
		
		res.json(da);
	});
});

// PUT
dataRoute.put(function(req,res){
	console.log('PUT',req.params.id,req.body.newname);

	Data.update({id:req.params.id},{$set: {name:req.body.newname}},function(err){
		//dara.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'data updated',data:req.params.id});
	});
});

// DELETE

dataRoute.delete(function(req,res){
	console.log('DELETE',req.params.id);
	
	Data.remove({id:req.params.id},function(err){
		if(err)
			res.send(err);
		res.json({message:'data removed'});
	});
});

// --------------------------------
//Connect to data MongoDB
// --------------------------------
mongoose.connect('mongodb://localhost:27017/data')

// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);