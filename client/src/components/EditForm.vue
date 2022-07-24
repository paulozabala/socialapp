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
				<v-btn icon v-bind="attrs" v-on="on" >
					<v-icon>build</v-icon>
				</v-btn>
			</template>

			<!--setting background and form in center-->
			<v-card class="d-flex justify-center pt-8 pb-8" flat outlined color="light-blue darken-4" >
				<!--wraping the form rows-->
				<v-card  width="100%" max-width="800px">
					<form>
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
												v-model="userName"
												:error-messages="nameErrors"
												:counter="8"
												label="Nombre de usuario"
												autocomplete
												required
												@input="$v.userName.$touch()"
												@blur="$v.userName.$touch()"
											></v-text-field>
											<v-text-field width="100%"
												v-model="password"
												:error-messages="passErrors"
												:counter="8"
												label="Password"
												required
												autocomplete
												type="password"
												@input="$v.password.$touch()"
												@blur="$v.password.$touch()"
											></v-text-field>
											<v-text-field
												v-model="userObj.name"
												label="Nombre"
												required
											></v-text-field>
											<v-text-field
												v-model="userObj.lastname"
												label="Apellidos"
												required
											></v-text-field>
											<!--sex field-->
											<v-card-title class="d-flex justify-start  text-h5">Sexo</v-card-title>
											<v-card class="" flat >
												<v-list-item-group class="d-flex justify-space-around"
													v-model="userObj.sex"
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
												v-model="userObj.description"
												label="Descripción"
												required
											></v-text-field>
											
											<!--Birthday´s field-->
											<v-card-title class="d-flex align-start flex-column text-h6">Fecha de nacimiento</v-card-title>
											<v-date-picker
												v-model="userObj.birthday"
												width="100%"
												max-width="600px"
												class="mt-4"
											></v-date-picker>

											<!--Interests field-->
											<v-card-title class="d-flex align-start flex-column  text-h5">Intereses</v-card-title>
											<v-list shaped class="d-flex justify-start" width="100%" >
												<v-list-item-group 
													class="d-flex align-start flex-column"
													v-model="userObj.interests"
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
													v-model="userObj.lookingfor"
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
								@click="updateUser()"
							>
								<h3>Actualizar</h3>
							</v-btn>
						</v-card-actions>
					</form>
				</v-card>
			</v-card>
		</v-dialog>
		
		<!--alerts-->
		<!--User not available-->
		<v-dialog
			v-model="dialogNoAvailable"
			width="500"
		>
			<v-card>
				<v-card-title class="text-h5 error lighten-2">
					<span class="white--text">Usuario No disponible</span>
				</v-card-title>

				<v-card-text class="text-h6">
					El nombre digitado ya existe, porfavor ingrese un nombre diferente
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						text
						@click="dialogNoAvailable = false"
					>
						Aceptar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<!--User successfully updated-->
		<v-dialog
			v-model="dialogUpdated"
			width="500"
		>
			<v-card>
				<v-card-title class="text-h5 light-blue darken-4">
					<span class="white--text"> Usuario Actualizado con Exito</span>
				</v-card-title>

				<v-card-text class="text-h6 pa-2">
					¡Usuario ha sido actualizado exitosamente!
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="light-blue darken-4"
						text
						@click="dialogUpdated = false"
					>
						Aceptar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!--Error: User cant be saved-->
		<v-dialog
			v-model="dialogError"
			width="500"
		>
			<v-card>
				<v-card-title class="text-h5 error lighten-2">
					Proceso No exitoso:
				</v-card-title>

				<v-card-text class="text-h6 pa-2">
					¡Ups! Es posible que falte algún dato revisa porfavor. (Usuario no fue actualizado)
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						text
						@click="dialogError = false"
					>
						Aceptar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
const axios = require('axios');
import moment from 'moment'
import {Global} from '../assets/global.js'

export default{
	name:'Edit_Form',

	mixins: [validationMixin],

	validations: {
		userName: { required, maxLength: maxLength(8) },
		password: { required, maxLength: maxLength(8) },
		},

	created(){
		this.getUserData();
	},



	data: function(){
		return{
			userInfo:'',
			dialog:false,
			dialogNoAvailable:false,
			dialogUpdated:false,
			dialogError:false,
			sexarray:Global.sexarray,
			interarray:Global.interarray,
			lookingarray:Global.lookingarray,
			url:'http://localhost:3000/api/',
			userName:'',
			password:'',
			userObj:{
				userName:'',
				password:'',
				name:'',
				lastname:'',
				sex:null,
				description:'',
				birthday:'',
				interests:[],
				lookingfor:null,
				img:'',
			},
			msgData:'',
		}
	},
	computed: {
		nameErrors () {
			const errors = []
			if (!this.$v.userName.$dirty) return errors
			!this.$v.userName.maxLength && errors.push('Nombre  debe tener como maximo 8 caracteres')
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
		getUserData(){
			//clear userinfo¬
			this.userInfo='';

			//Getting id from params in actual url¬
			this.user = localStorage.getItem("userName");

			//Getting user's data and linking form variables¬
			axios
				.get(this.url+'searchProfile/'+this.user)
				.then((res)=>{
					if(res.data.status=="success"){
						this.userInfo = res.data.userFound[0];

						//Create the route for profile's avatar-img. couldnt be written in computed¬
						//it causes Get's problems because this.userinfo didnt charge fast enough.¬
						this.route = this.url+'getImage/'+this.userInfo.img;

						//Copying DB info and linking with page render
						//transforming date format to be readable for datepicker
						let birthdate = moment(this.userInfo.birthday).add(1,"day").format("YYYY-MM-DD");

						//userName & password arent linked to userObj bc validation needs to not be into an object
						this.userName = this.userInfo.userName;
						this.password = this.userInfo.password;
						
						this.userObj.name = this.userInfo.name;
						this.userObj.lastname = this.userInfo.lastname;
						this.userObj.sex = this.userInfo.sex;
						this.userObj.description = this.userInfo.description;
						this.userObj.birthday = birthdate;
						this.userObj.interests = this.userInfo.interests;
						this.userObj.lookingfor = this.userInfo.lookingfor;
						this.userObj.img = this.userInfo.img;

					}else{
						//User doesnt exist
					}
				}).catch((error)=>{
					console.log("no fue posible conectar con la BD",error);
					});
				},//end of getUserData


		//check if doesnt exist(userName) then save
		updateUser(){
			
			//setting to false alert variables
			this.dialogNoAvailable=false;
			this.dialogSaved=false;
			this.dialogError=false;
			
			//prepare userid and userName variables
			var userId = this.userInfo._id;
			console.log("id es: ", userId);
			var userNoBD = this.userName;
			
			if ( userNoBD  == "" || userNoBD.length <= 4) {
				alert('Porfavor ingrese un usuario mayor a 4 caracteres');
			}
			//User's name length must be above 4 chars at least
			if (userNoBD.length > 4){

				//doing the request if user exists
				axios
					.get(this.url + "searchProfile/" + userNoBD)
					.then((res) => {
						if (res.data.status == "success") {
							this.dialogNoAvailable=true;
						}else if (res.data.status == "noUser"){

							//preparing user objet to be sended
							this.userObj.userName = this.userName;
							this.userObj.password = this.password;

							//user doesnt exist then save
							axios
							.put(this.url+'modUser/'+userId,this.userObj)
							.then((req)=>{
								if(req.data.status == "success"){
									var userID = req.data.userUpdated._id;
									var nameBD = req.data.userUpdated.userName;

									//Put username data in localstorage
									localStorage.setItem("id", userID);
									localStorage.setItem("userName", nameBD);

									//Show success msg and redirect to home page
									this.dialogUpdated=true;
									let tempname = this.userInfo.userName;
									let data = {
										ownerName:this.userObj.userName,
										img:this.userObj.img
									};
									this.getMsgByOwner(tempname, data);

								}else {
									this.dialogError=true;
								}
							}).catch((err)=>{
								console.log("Error al actualizar en BD",err);
								});
						}
					}).catch((error) => {
						console.log("NO fue posible comprobar Usuario",error);
						});
			}
		},//updateUser function end

		//function to get user`s messages
		getMsgByOwner(id,data){
			axios
			.get(this.url+"getMsgByOwner/"+id)
			.then((res)=>{
				if (res.data.status=="success"){
					this.msgData=res.data.msgFound;
					this.leng=this.msgData.length;
					
					for (let i=0; i<this.leng ;i++) {
						let mID = this.msgData[i]._id;
						this.updateBD(mID, data);
					}
				}

			}).catch((error)=>{
				console.log("request error, wasnt successful",error);
				});
		},//end of getMsgByOwner

			//updating msg ownernames into DB
			updateBD(id,data){

					//ready to save msg's likes status
					axios
						.put(this.url+"updateMsg/"+id,data)
						.then((req)=>{
							if(req.data.status == "success"){
								//cargue exitoso de los likes
							}else console.log("hubo un error y no se actualizo el estados de los likes");
								
						}).catch((error)=>{
							console.log("no se pudo conectar con la BD",error);
							});

			},//updateBD funct. ends



	}//end of methods
}//end of exportdef
</script>
