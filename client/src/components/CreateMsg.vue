<template>
	<div>
		<!--My public msg box-->
		<v-card class="mt-6" width="500">
			<v-card flat  class="d-flex justify-center pa-2 pt-4 pb-0 " width="500" >
				<v-card :class="$vuetify.breakpoint.width<=360 ? 'mr-12' : 'mr-4'"  flat  width="15%">
					<v-avatar size="60">
						<v-img
							:src=msgObj.img
						/>
					</v-avatar>
				</v-card>
				<v-card  flat  width="85%">
					<div>
						<v-text-field
							v-model="msgObj.msg"
							@click="showDialog()"
							label="¿Quieres compartir algo?"
							outlined
							rounded
						></v-text-field>
					</div>
				</v-card>
			</v-card>
			<v-divider width="95%"></v-divider>
		
			<!--My  public msg box buttons-->
			<v-card flat  class="d-flex justify-center pa-2" width="500">
				<v-card flat  width="100%" >
					<v-icon color="#1e81b0" class="material-icons mr-2">add_photo_alternate
					</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Imagen</span>
				</v-card>
				<v-card @click="send()" flat  width="100%">
					<v-icon class="mr-2">send</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Enviar</span>
				</v-card>
			</v-card>
		</v-card>

		<!--dialog to write messages-->	
		<v-dialog
			v-model="dialog"
			width="500"
		>
			<v-card >
				<v-card-title class="d-flex justify-center">
					<span class="text-h5">¡Comparte tus historias con el mundo!</span>
				</v-card-title>
				<v-card-text>
					<v-textarea
						v-model="msgObj.msg"
						counter
						label="¡Comparte tus emociones!"
						:rules="rules"
						:value="value"
					></v-textarea>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						small
						color="red darken-1"
						text
						@click="goBack()"
					>
						No deseo escribir
					</v-btn>
					<v-btn
						small
						color="blue accent-4"
						text
						@click="dialog = false"
					>
						Terminé
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<!-- dialog for message saved successfully-->
		<v-dialog v-model="savedDialog" width="400">
			<v-card cols="12" class="d-flex align-center flex-column pa-4" width="100%"  >
				<v-card-title :class="$vuetify.breakpoint.width<=290 ? 'text-body-2' : 'text-h6' ">Mensaje Guardado con éxito</v-card-title>
				
				<v-card-text flat tile class="d-flex justify-start pa-6" color="white"  width="100%" >
					<span class="text-h5">¡Su mensaje ha sido enviado con éxito!</span>
				</v-card-text>

				<v-card-actions flat tile class="d-flex justify-center" width="100%">
					<v-btn text @click="savedDialog = false" color="blue accent-8">
						<v-icon>check_circle</v-icon>
						<span>Aceptar</span>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</div>
</template>
<script>
import axios from 'axios'
import {Global} from '../assets/global.js'
import moment from 'moment'

export default{
		name:'Create_Msg',

		created(){
			this.getUserData();
		
		},


		data(){
			return{
				msg:'',
				dialog:false,
				rules: [v => v.length <= 300 || 'Max 300 caracteres'],
				value: 'Escribe tu historia aqui...',
				url:Global.url,
				savedDialog:false,
				msgObj:{
					ownerName:'',
					msg:'',
					img:'',
					whoVotes:[],
					whoLikes:[],
					mdate:'',
				},
			}
		},
			
		methods:{
			showDialog(){
				this.dialog=true;
			},

			goBack(){
				this.msg ='';
				this.dialog=false;
				
			},

			//Get User's img information
			getUserData(){

				//Adding userName from localStorage to the msg object
				this.msgObj.ownerName = localStorage.getItem("userName");
				axios
					.get(this.url+"searchProfile/"+this.msgObj.ownerName)
					.then((res)=>{
						if(res.data.status == "success"){

							//Store into the img's objet the img's information
							this.msgObj.img = this.url+'getImage/'+ res.data.userFound[0].img;
						
						}else console.log("usuario no existe");

					}).catch((error)=>{
							console.log("error al consultar con la base de datos",error);
							});
			},

			send(){

				//Preparing object before being sended to DB
				this.msgObj.mdate = moment().format("LLL");
				
				//saving the object into DB
				axios
					.post(this.url+"saveMsg",this.msgObj)
					.then ((req)=>{

						if (req.data.status == "success"){
							
							this.savedDialog = true;
							this.$router.push('/');
						}else{
							console.log("mensaje no pudo ser guardado");
						}

					}).catch((error)=>{
							console.log("error en la conexion con la BD",error);
	
					});
					
			},
		},

};


</script>
