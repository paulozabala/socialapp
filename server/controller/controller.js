const validator = require('validator');
const userModel = require('../models/userModel');

var  controller = {

	saveUser:async (req, res) => {

	// Recoger parametros por post
		var params = req.body;

	//Validar datos (validator)

		try {var validate_name = !validator.isEmpty(params.name);
			var validate_lastname = !validator.isEmpty(params.lastname);
			var validate_email = !validator.isEmpty(params.email);
			var validate_password = !validator.isEmpty(params.password);
			var validate_birthday = !validator.isEmpty(params.birthday);
			var validate_sex = !validator.isEmpty(params.sex);
			var validate_img = !validator.isEmpty(params.img);
			var validate_msg = !validator.isEmpty(params.msg);
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Faltan datos por enviar !!!'
			});
		}

		if (validate_name &&
			validate_lastname &&
			validate_email &&
			validate_password &&
			validate_birthday &&
			validate_sex &&
			validate_img &&
			validate_msg
		) {

			//Crear el objeto a guardar

			var register = new userModel();
			// Asignar valores
			register.name = params.name;
			register.lastname = params.lastname;
			register.email = params.email;
			register.password = params.password;
			register.birthday = params.birthday;
			register.sex = params.sex;
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

	getClient: async (req, res) => {
		
		var profile = req.params.prof;
		var query = login.find({email: profile});

		if (profile || profile != undefined) {
			query.limit(5);
		}
		// Find
		await query.sort('email').exec((err, userFound) => {

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
				userFound
			});
		});
    },

}; //end of controller

module.exports = controller;

