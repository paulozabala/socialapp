'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name:String,
	lastname:String,
	email:String,
	password:String,
	birthday:Date,
	sex:String,
	img:String,
	msg:String
	});

module.exports = mongoose.model('UserM', userSchema);
