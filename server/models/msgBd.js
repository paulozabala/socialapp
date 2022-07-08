'use strict'

//const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgBDSchema = Schema({
	message:String,
	likes:String,
	votes:String,
	wholikes:String,
	});

module.exports = mongoose.model('msgBD', msgBDSchema);
