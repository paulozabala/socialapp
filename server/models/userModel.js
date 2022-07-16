'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	userName:String,
	password:String,
	name:String,
	lastname:String,
	sex:String,
	description:String,
	birthday:Date,
	interests:String,
	lookingfor:String,
	img:String,
	msg:String
	});

module.exports = mongoose.model('UserS', userSchema);
