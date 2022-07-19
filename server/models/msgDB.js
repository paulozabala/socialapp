'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = Schema({
	ownerID:String,
	userName:String,
	img:String,
	msg:String,
	whoVotes:Array,
	whoLikes:Array,
	date:Date,
	});

module.exports = mongoose.model('msgDB', msgSchema);
