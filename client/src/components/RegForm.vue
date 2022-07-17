<template>
	<div class="pa-0">
	<v-dialog
		class="pa-0"
		v-model="dialog"
		persistent
		width="100%"
	>	

		<!--Template where activator will come-->
		<template v-slot:activator="{ on, attrs }">
			<v-btn  text class="text-h6 mb-n2"  v-bind="attrs" v-on="on" >
				Registrarse
			</v-btn>
		</template>

		<!--setting background and form in center-->
		<v-card class="d-flex justify-center pt-8 pb-8" flat outlined color="light-blue darken-4" >
			<!--wraping the form rows-->
			<v-card  width="100%" max-width="800px">
				
				<!--Title-->
				<v-card-title class="d-flex justify-center">
					<span class="text-h4">Información Personal</span>
				</v-card-title>
				
				<!--form's content / body of the card (close and save buttons not included)-->
				<v-card-text>
					<v-container >
						<v-row>
							<!--Center form's content-->
							<v-col align="center">
						
								<!--wrapping form's content or fields-->
								<v-card class="justify-start" flat width="600px">
									<v-text-field width="100%"
										v-model="user.userName"
										:error-messages="nameErrors"
										:counter="8"
										label="Nombre de usuario"
										autocomplete
										required
										@input="$v.userName.$touch()"
										@blur="$v.userName.$touch()"
									></v-text-field>
									<v-text-field width="100%"
										v-model="user.password"
										label="Password"
										required
									></v-text-field>
									<v-text-field
										v-model="user.name"
										label="Nombre"
										required
									></v-text-field>
									<v-text-field
										v-model="user.lastname"
										label="Apellidos"
										required
									></v-text-field>
									<!--sex field-->
									<v-card-title class="d-flex justify-start  text-h5">Sexo</v-card-title>
									<v-card class="" flat >
										<v-list-item-group class="d-flex justify-space-around"
											v-model="user.sex"
											color="blue accent-2"
											width="100%"
										>
											<v-list-item width="100%"
												v-for="(item, i) in sexarray"
												:key="i"
											>
												<v-list-item-content width="100%">
													<v-list-item-title class="d-flex justify-center" block v-text="item" width="100%"></v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-card>
									<v-spacer></v-spacer>
	
									<!--Description field-->
									<v-card-title class="d-flex align-start flex-column text-h6">Breve descripción</v-card-title>
									<v-text-field
										v-model="user.description"
										label="Descripción"
										required
									></v-text-field>
									
									<!--Birthday´s field-->
									<v-card-title class="d-flex align-start flex-column text-h6">Fecha de nacimiento</v-card-title>
									<v-date-picker
										v-model="user.birthday"
										width="100%"
										max-width="600px"
										class="mt-4"
									></v-date-picker>

									<!--Interests field-->
									<v-card-title class="d-flex align-start flex-column  text-h5">Intereses</v-card-title>
									<v-list shaped class="d-flex justify-start" width="100%" >
										<v-list-item-group 
											class="d-flex align-start flex-column"
											v-model="user.interests"
											multiple
											width="100%"
										>
											<template v-for="(item, i) in interarray">
											<v-divider
												v-if="!item"
												:key="`divider-${i}`"
											></v-divider>
											<v-list-item
												v-else
												:key="`item-${i}`"
												:value="item"
												active-class="blue--text text--accent-4"
												width="100%"
											>
												<template v-slot:default="{ active }">
				
													<v-list-item-action>
														<v-checkbox
															:input-value="active"
															color="blue accent-4"
														></v-checkbox>
													</v-list-item-action>

													<v-list-item-content width="100%">
														<v-list-item-title v-text="item"></v-list-item-title>
													</v-list-item-content>
												</template>	
											</v-list-item>
											</template>
										</v-list-item-group>
									</v-list>

									<!--lookingfor field-->
									<v-card-title class="d-flex justify-start  text-h5">¿Qué estas buscando?</v-card-title>
									<v-card class="d-flex align-start flex-column" flat >
										<v-list-item-group class=""
											v-model="user.lookingfor"
											color="grey"
											width="100%"
										>
											<v-list-item width="100%"
												v-for="(item, i) in lookingarray"
												:key="i"
											>
												<v-list-item-content width="100%">
													<v-list-item-title class="d-flex justify-start" block v-text="item" width="100%"></v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-card>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<!--action buttons (close and save)-->	
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="blue darken-1"
						text
						@click="dialog = false"
					>
						<h3>Cerrar</h3>
					</v-btn>
					<v-btn
						color="blue darken-1"
						text
						@click="save(user.userName)"
					>
						<h3>Guardar</h3>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-card>
	</v-dialog>
	<!--alerts-->
	<v-snackbar v-model="snackbar">
		{{ text }}
	</v-snackbar>

	<v-alert v-if="this.errorAlert" type="error">
		Proceso No exitoso: Usuario no pudo ser guardado en nuestra Base de datos
	</v-alert>

	<v-alert v-if="this.successAlert==true" type="success">
		Usuario guardado exitosamente.
	</v-alert>


</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
const axios = require('axios');

export default{
	name:'Reg_Form',

	mixins: [validationMixin],

	validations: {
		userName: { required, maxLength: maxLength(8) },
		password: { required, maxLength: maxLength(8) },
		},
	data: function(){
		return{
			dialog:false,
			sexarray:['Femenino','Masculino','Prefiero no decirlo'],
			interarray:['Ciclismo','Deportes','Programación','Salud y Bienestar','Viajes y cultura','Videojuegos','Gastronomia'],
			lookingarray:['Amistad','Una relación','Solo pasarla bien','Intimidad Sexual'],
			url:'http://localhost:3000/api/',
			user:{
				userName:'',
				password:'',
				name:'',
				lastname:'',
				sex:'',
				description:'',
				birthday:'',
				interests:[],
				lookingfor:'',
				img:'',
				msg:[],
			},
			snackbar: false,
			text: `Usuario ya registrado, Ingrese otro usuario porfavor. `,
			errorAlert:false,
			successAlert:false,
		}
	},
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
	
	methods:{

		//check if doesnt exist(userName) then save
		save(){
			console.log("entro a save");	
			//setting to false alert variables

			this.errorAlert=false;
			this.successAlert=false;
			this.snackbar=false;
	
			var userNoBD = this.user.userName;
			
			if ( userNoBD  == "" || userNoBD.length <= 4) {
				alert('Porfavor ingrese un usuario mayor a 4 caracteres');
			}
			//User's name length must be above 4 chars at least
			if (userNoBD.length > 4){
				axios
					.get(this.url + "searchprofile/" + userNoBD)
					.then((res) => {
						if (res.data.status == "success") {
							this.snackbar=true;
						}else if (res.data.status == "noUser"){
							axios
							.post(this.url+'saveUser',this.user)
							.then((req)=>{
								if(req.data.status == "success"){
									console.log("req.data.userStored es:",req.data.userStored);
									var userID = req.data.userStored._id;
									var nameBD = req.data.userStored.userName;
									console.log('infodel guardado', req.data);
									localStorage.setItem("id", userID);
									localStorage.setItem("userName", nameBD);
									this.successAlert=true;
									setTimeout(function () {
									window.open("/"+nameBD,"_self",
									"menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");
									}, 2500);

									this.$router.push("/" + nameBD );
								}else {
									this.errorAlert=true;
								}
							}).catch((err)=>{
								console.log("Error al guardar en BD",err);
								});
						}
					}).catch((error) => {
						console.log("NO fue posible comprobar Usuario",error);
						});
			}
		},//save function end
	}//end of methods
}//end of exportdef
</script>
