<template>
	<div>
	<v-dialog
		v-model="dialog"
		persistent
		width="600px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn  text class="text-h6 mb-n2"  v-bind="attrs" v-on="on" >
				Registrarse
			</v-btn>
		</template>
		<v-card  width="600px">
			<v-card-title>
				<span class="text-h4">Información Personal</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col align="center"
							width="600px"
						>
							<v-card class="justify-start" width="600px">
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
								<v-text-field
									v-model="user.description"
									label="Descripción"
									required
								></v-text-field>
								<v-card-title class="d-flex align-start flex-column text-h6">Fecha de nacimiento</v-card-title>
								<v-date-picker
									v-model="user.birthday"
									width="400px"
									class="mt-4"
								></v-date-picker>

								<v-list shaped class="d-flex justify-start">
									<v-list-item-group 
										class="d-flex align-start flex-column"
										v-model="user.interests"
										multiple
								><v-card-title class="d-flex align-start flex-column  text-h5"> Intereses</v-card-title>
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
										>
											<template v-slot:default="{ active }">
			
												<v-list-item-action>
													<v-checkbox
														:input-value="active"
														color="blue accent-4"
													></v-checkbox>
												</v-list-item-action>

												<v-list-item-content>
													<v-list-item-title v-text="item"></v-list-item-title>
												</v-list-item-content>
											</template>	
										</v-list-item>
										</template>
									</v-list-item-group>
								</v-list>

								<v-card class="d-flex justify-start flex-column">
									<v-card-title class="d-flex justify-start  text-h5">¿Qué estas buscando?</v-card-title>
									<v-list-item-group class="d-flex justify-start"
										v-model="user.lookingfor"
										color="grey"
									>
										<v-list-item width="600px"
											v-for="(item, i) in lookingarray"
											:key="i"
										>
											<v-list-item-content width="100%">
												<v-list-item-title block v-text="item" width="100%"></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</v-card>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue darken-1"
					text
					@click="dialog = false"
				>
					Cerrar
				</v-btn>
				<v-btn
					color="blue darken-1"
					text
					@click="save(user.userName)"
				>
					Guardar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
			interarray:['Ciclismo','Deportes','Programación','Salud y Bienestar','Viajes y cultura','Videojuegos','Gastronomia'],
			lookingarray:['Amistad','Una relación','Solo pasarla bien','Intimidad Sexual'],
			url:'http://localhost:8080/api/',
			user:{
				userName:'',
				password:'',
				name:'',
				lastname:'',
				description:'',
				birthday:'',
				interests:[],
				lookingfor:'',
			},
			snackbar: false,
			text: `Usuario guardado satisfactoriamente`,
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
		send(id){
				var usuario = this.user.userName;
				var pass = this.user.password;
				
				if ( usuario  == "" || usuario.length <= 5) {
					alert('Porfavor Inserte un usuario mayor a 5 caracteres');
				}
					
				if (usuario.length > 5){
					axios
						.get(this.url + "search/" + id)
						.then((res) => {
							if (res.data.status == "success") {
								let userID = res.data.usuarion[0]._id;
								let nombre = res.data.usuarion[0].userName;
								let passbd = res.data.usuarion[0].password;
								if(pass == passbd){
									localStorage.setItem("id", userID);
									localStorage.setItem("userName", nombre);
									this.$router.push("/" + nombre);
								}else{
									alert("Contraseña No coincide");
									} 
							}else{
								axios
								.post(this.url+'save/',this.user)
								.then((req)=>{
									if(req.data.status == "success"){
										this.snackbar = true;

									}
								
								}).catch((err)=>{
									console.log("No se pudo guardar usuario",err);
									});

						}
						}).catch(error => {
							alert("Usuario NO Registrado",error);
							});

					}
		},
	}		
}
</script>
