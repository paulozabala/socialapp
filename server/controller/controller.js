const validator = require('validator');
const userModel = require('../models/userModel');
const msgDB = require('../models/msgDB');
const commentsDB = require('../models/commentsDB');



var  controller = {

	test: (req, res) => {
		return res.status(200).json({
			message: 'Soy la acción test de mi controlador '
		});
	},
//---------------------------------------Save-functions---------------------------------//

	saveUser:async (req, res) => {

		// Colect parameters form url
		var params = req.body;

		//Validate data (validator)

		try {
			var validate_userName = !validator.isEmpty(params.userName);
			var validate_password = !validator.isEmpty(params.password);
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Faltan datos por enviar !!!'
			});
		}

		if (validate_userName &&
			validate_password
		) {

			//Create the object for being saved

			var register = new userModel();
			
			// Passing values to the object
			register.userName = params.userName;
			register.password = params.password;
			register.name = params.name;
			register.lastname = params.lastname;
			register.sex = params.sex;
			register.description = params.description;
			register.birthday = params.birthday;
			register.interests = params.interests;
			register.lookingfor = params.lookingfor;
			register.img = params.img;
			register.msg = params.msg;

			// saving the object
		
			await register.save((err, userStored) => {

				if (err || !userStored) {
					return res.status(404).send({
						status: 'error',
						message: 'El usuario no se ha guardado !!!'
					});
				}

				// Return success answer
				return res.status(200).send({
					status: 'success',
					userStored
				});

			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'Los datos no son válidos, revise si faltan datos!!!'
			});
		}

	},


	// function for saving msg
	saveMsg:async (req, res) => {

		// Receiving parameters from post
		var params = req.body;

		//Validate data (validator)

		try {
			var validate_ownerID = !validator.isEmpty(params.userID);
			var validate_msg = !validator.isEmpty(params.msg);
			var validate_whoVotes = !validator.isEmpty(params.whoVotes);
			var validate_whoLikes= !validator.isEmpty(params.whoLikes);
			var validate_date = !validator.isEmpty(params.date);
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Faltan datos por enviar !!!'
			});
		}

		if (validate_ownerID &&
			validate_msg &&
			validate_whoVotes &&
			validate_whoLikes &&
			validate_date
		) {

			//Create the object to save

			var register = new msgDB();
			
			// Passing values for being saved
			register.ownerID = params.userID;
			register.msg = params.msg;
			register.whoVotes = params.whoVotes;
			register.whoLikes = params.whoLikes;
			register.date = params.date;

			// Save object on DB
		
			await register.save((err, msgStored) => {

				if (err || !msgStored) {
					return res.status(404).send({
						status: 'error',
						message: 'El mensaje no se ha guardado !!!'
					});
				}

				// Devolver una respuesta 
				return res.status(200).send({
					status: 'success',
					msgStored
				});

			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'Los datos no son válidos, revise si faltan datos!!!'
			});
		}

	},

	// save comments function.

	saveComment:async (req, res) => {

		// Colect parameters form url
		var params = req.body;

		//Validate data (validator)

		try {
			var validate_msgID = !validator.isEmpty(params.msgID);
			var validate_comment = !validator.isEmpty(params.comment);
			var validate_ownerID = !validator.isEmpty(params.ownerID);
			var validate_date = !validator.isEmpty(params.date);
		
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Faltan datos por enviar !!!'
			});
		}

		if (validate_msgID &&
			validate_comment &&
			validate_ownerID &&
			validate_date
		) {

			//Create the object for being saved

			var register = new commentsDB();
			
			// Passing values to the object
			register.msgID = params.msgID;
			register.comment = params.comment;
			register.ownerID = params.ownerID;
			register.date = params.date;

			// saving the object
		
			await register.save((err, commentStored) => {

				if (err || !commentStored) {
					return res.status(404).send({
						status: 'error',
						message: 'El comentario no ha sido guardado !!!'
					});
				}

				// Return success answer
				return res.status(200).send({
					status: 'success',
					commentStored
				});

			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'Los datos no son válidos, revise si faltan datos!!!'
			});
		}

	},

//-----------------------------------GETTERS--------------------------------------------//-
	
	//function to get an user by userName if exist

	getUser:  (req, res) => {
		
		var profile = req.params.prof;
		var query = userModel.find({userName : profile});

		if (profile || profile != undefined) {
			query.limit(5);
		}
		// Find
		query.sort('userName').exec((err, userFound) => {

			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error al devolver el usuario !!!'
				});
			}

			if (!userFound || userFound=='' ) {
				return res.status(200).send({
					status: 'noUser',
					message: 'Usuario no Existe !!!'
				});
			}

			return res.status(200).send({
				status: 'success',
				userFound : userFound
			});
		});
    },

	//function to get msg by ownerID if exist (Ordered by date, msg limit = 20 )

	getMsgByOwner:  (req, res) => {
		
		var owner = req.params.id;
		
		//find by OwnerID
		var query = msgDB.find({ownerID : owner});

		if (owner || owner != undefined) {
			query.limit(20);
		}
		
		// Sort - descending
		query.sort({date: -1}).exec((err, msgFound) => {

			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error al devolver los mensajes!!!'
				});
			}

			if (!msgFound || msgFound=='' ) {
				return res.status(200).send({
					status: 'noMsg',
					message: 'No existen mensajes de este Usuario !!!'
				});
			}

			return res.status(200).send({
				status: 'success',
				msgFound
			});
		});
	},

	//function to get first 50 msg ordered by date, in descending order

	getMsgs:  (req, res) => {
		
		//find every existing msg
		var query = msgDB.find();

		if (query || query != undefined) {
			query.limit(50);
		}
		
		// Sort - descending
		query.sort({date: -1}).exec((err, msgFound) => {

			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error al devolver los mensajes!!!'
				});
			}

			if (!msgFound || msgFound=='' ) {
				return res.status(200).send({
					status: 'noMsg',
					message: 'No existen mensajes de este Usuario !!!'
				});
			}

			return res.status(200).send({
				status: 'success',
				msgFound
			});
		});
	},

	//function to get comments by message ID if exist (Ordered by date, comments limit = 20 )

	getComments:  (req, res) => {
		
		var msgId = req.params.id;
		
		//find by OwnerID
		var query = commentsDB.find({msgID : msgId });

		if (msgId || msgId != undefined) {
			query.limit(20);
		}
		
		// Sort - descending
		query.sort({date: -1}).exec((err, commentFound) => {

			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error al devolver los mensajes!!!'
				});
			}

			if (!commentFound || commentFound=='' ) {
				return res.status(200).send({
					status: 'noMsg',
					message: 'No existen mensajes de este Usuario !!!'
				});
			}

			return res.status(200).send({
				status: 'success',
				commentFound
			});
		});
    },


}; //end of controller

module.exports = controller;

