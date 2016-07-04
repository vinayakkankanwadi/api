// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');


// Create our Express application
var app = express();
// Create Router
var router = express.Router();

// --------------------------------
// Register routers
// --------------------------------
app.use('/',router);

// Get
router.get('/',function(req,res){
	res.json({message: 'Getting resposne from Vin'})
});


// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);