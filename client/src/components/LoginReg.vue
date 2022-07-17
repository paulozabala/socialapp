<template>
	<v-container >
		<v-row class="text-center pa-8" >
			<!--row for wrapping and vertical align-->
			<v-row  align="center">
				
				<!--set 2 columns for img and login form-->
				<v-col  md="6" sm="5" xs="12" align='center' >
					<v-img
						src="../assets/community.svg" 
						alt="community"
						contain
						width="600px"
						height="400px"
					/>  <!--contain   causes picture not to be cropped -->
				</v-col>
				
				<!--Login form-->	
				<v-col  md="5" sm="6" xs="12" class="pa-10" align="center"  offset="1" offset-xl="0" >

					<!--alerts-->
					<v-alert v-if="this.successAlert==true"  type="success">Acceso confirmado</v-alert>
					<v-alert v-if="this.errorAlert==true" type="error">Contraseña y/o usuario incorrecto</v-alert>
					<v-alert v-if="this.noUserAlert==true" type="error">Usuario no existe en nuestros registros</v-alert>
					
					<!--title-->
					<span :class="$vuetify.breakpoint.width<=254 ? 'ml-n8 text-h4 text-sm-h4 font-weight-black':'text-h4 text-sm-h4 font-weight-black'">Login</span>
					<form :class="$vuetify.breakpoint.width<=254 ? 'ml-n8' : ''">
						<v-text-field
							v-model="userName"
							:error-messages="nameErrors"
							:counter="8"
							label="Nombre de usuario"
							autocomplete
							required
							@input="$v.userName.$touch()"
							@blur="$v.userName.$touch()"
						></v-text-field>
						<v-text-field
							type="password"
							v-model="password"
							:error-messages="passErrors"
							label="Contraseña"
							autocomplete
							required
							@input="$v.password.$touch()"
							@blur="$v.password.$touch()"
						></v-text-field>
						<v-btn
							class="mt-4"
							@click="submit()"
						>
							Ingresar
						</v-btn><br>
					</form>
				</v-col>
			</v-row>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'


export default {
	name: 'Login_Reg',
	
	mixins: [validationMixin],

	validations: {
		userName: { required, maxLength: maxLength(8) },
		password: { required, maxLength: maxLength(8) },
		},

	data: () => ({
		
		userName: '',
		password:'',
		dialog:false,
		errorAlert:false,
		successAlert:false,
		noUserAlert:false,
		url:'http://localhost:3000/api/'
	}),

	computed: {
		nameErrors () {
			const errors = []
			if (!this.$v.userName.$dirty) return errors
			!this.$v.userName.maxLength && errors.push('Nombre  debe tener como maximot 8 caracteres')
			!this.$v.userName.required && errors.push('userName es requerido.')
			return errors
		},
		passErrors () {
			const errors = []
			if (!this.$v.password.$dirty) return errors
			!this.$v.password.required && errors.push('Password es requerido.')
			return errors
		},
	},

	methods: {
		submit () {
			console.log("entro a submit");
			//required inputs check
			this.$v.$touch()
			
			//setting alert variables to false
			this.errorAlert=false;
			this.successAlert=false;
			this.noUserAlert=false;

			//check if doesnt exist(userName) then save
			var userNoDB = this.userName;
			var pass = this.password;
				
				if ( userNoDB  == "" || userNoDB.length <= 4) {
					alert('Porfavor ingrese un usuario mayor a 4 caracteres');
				}
					
				if (userNoDB.length > 4){
					axios
						.get(this.url + 'searchprofile/' + userNoDB)
						.then((res) => {
							if (res.data.status == "success") {
								console.log("entro al get");
								let userID = res.data.userFound[0]._id;
								let nameDB = res.data.userFound[0].userName;
								let passbd = res.data.userFound[0].password;
								if(pass == passbd){
									this.successAlert = true;
									localStorage.setItem("id", userID);
									localStorage.setItem("userName", nameDB);
									setTimeout(function () {
										window.open("/"+nameDB,"_self",
										"menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
									}, 1500);
									//this.$router.push("/" + nameDB);
								}else{
									this.errorAlert=true;
									}
							}else{
								this.noUserAlert=true;
								}
						}).catch((error)=>{
							console.log("Connection with DB failed:",error);
							});
				}
			},
	}
};
</script>
