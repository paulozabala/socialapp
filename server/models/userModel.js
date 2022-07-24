'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	userName:String,
	password:String,
	name:String,
	lastname:String,
	sex:Number,
	description:String,
	birthday:Date,
	interests:Array,
	lookingfor:Number,
	img:String,
	});

module.exports = mongoose.model('UserS', userSchema);
