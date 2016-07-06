// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dataController = require('./controllers/data')

// --------------------------------
//Connect to data MongoDB
// --------------------------------
mongoose.connect('mongodb://localhost:27017/data')

// Create our Express application
var app = express();
// Create Router
var router = express.Router();

// create endpoint handler for /data
router.route('/data')
	.post(dataController.postData)
	.get(dataController.getDatas);
	
// create endpoint handler for /data/:id
router.route('/data/:id')
	.get(dataController.getData)
	.put(dataController.putData)
	.delete(dataController.deleteData);

// --------------------------------
// Register routers, body-parser
// --------------------------------
// NOTE Order of bodyParser and router matters
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use('/',router);


// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);