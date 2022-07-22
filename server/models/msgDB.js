'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = Schema({
	ownerName:String,
	msg:String,
	img:String,
	whoVotes:Array,
	whoLikes:Array,
	like:Boolean,
	mdate:Date,
	});

module.exports = mongoose.model('msgDB', msgSchema);
