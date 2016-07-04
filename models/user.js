// --------------------------------
// Packages we require
// --------------------------------
var mongoose = require('mongoose');

// Define User schema
var UserSchema = new mongoose.Schema({
	id: Number,
	name: String
});

//Export the mongoose model
module.exports = mongoose.model('User',UserSchema);