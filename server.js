// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var dataController = require('./controllers/data');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// --------------------------------
//Connect to data MongoDB
// --------------------------------
mongoose.connect('mongodb://localhost:27017/api')

// Create our Express application
var app = express();
// Create Router
var router = express.Router();

// create endpoint handler for /data
router.route('/data')
	.post(authController.isAuthenticated,dataController.postData)
	.get(authController.isAuthenticated,dataController.getDatas);
	
// create endpoint handler for /data/:id
router.route('/data/:id')
	.get(authController.isAuthenticated,dataController.getData)
	.put(authController.isAuthenticated,dataController.putData)
	.delete(authController.isAuthenticated,dataController.deleteData);

// create endpoint handler for /users
router.route('/user')
	.post(userController.postUsers)
	.get(authController.isAuthenticated,userController.getUsers);	
	
// --------------------------------
// Register routers, body-parser
// --------------------------------
// NOTE Order of bodyParser and router matters
app.use(bodyParser.urlencoded({
	extended:true
}));
//Use passport 
app.use(passport.initialize());

app.use('/',router);


// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);