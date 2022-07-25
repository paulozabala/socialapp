'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = Schema({
	msgID:String,
	comment:String,
	ownerName:String,
	img:String,
	comDate:Date,
	});

module.exports = mongoose.model('commentDB', commentSchema);
