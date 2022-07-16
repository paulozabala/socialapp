const validator = require('validator');
const userModel = require('../models/userModel');

var  controller = {

	test: (req, res) => {
		return res.status(200).json({
			message: 'Soy la acción test de mi controlador de articulos'
		});
	},
	
	saveUser:async (req, res) => {

	// Recoger parametros por post
		var params = req.body;

	//Validar datos (validator)

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

			//Crear el objeto a guardar

			var register = new userModel();
			
			// Asignar valores
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

			// Guardar el articulo
		
			await register.save((err, userStored) => {

				if (err || !userStored) {
					return res.status(404).send({
						status: 'error',
						message: 'El usuario no se ha guardado !!!'
					});
				}

				// Devolver una respuesta 
				return res.status(200).send({
					status: 'success',
					userModel: userStored
				});

			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'Los datos no son válidos, revise si faltan datos!!!'
			});
		}

	},



//function to get an user by email/userName if exist

	getClient:  (req, res) => {
		
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
					message: 'Error al devolver los articulos !!!'
				});
			}

			if (!userFound) {
				return res.status(404).send({
					status: 'error',
					message: 'Usuario no Existe !!!'
				});
			}

			return res.status(200).send({
				status: 'success',
				userFound : userFound
			});
		});
    },

}; //end of controller

module.exports = controller;

