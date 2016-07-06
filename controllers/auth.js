// --------------------------------
// Packages we require
// --------------------------------
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
	function(username,password,callback){
		console.log('Pass',username,password);
		User.findOne({ username: username }, function(err, user) {			
			if (err) {return callback(err);}
			
			//No User with username
			if(!user){ return callback(null,false);}
			
			//Make sure the password is correct
			console.log('passss',password,user.password);
			user.verifyPassword(password,user.password,function(err,isMatch){
				if(err) {return callback(err);}
				
				// Password did not match
				if(!isMatch){ return callback(null,false);}
				
				//Success
				return callback(null,user);
			});
		});
	}
));

exports.isAuthenticated = passport.authenticate('basic',{session:false});