<template>
	<!--Home public msg box(head&body) it has dynamic card's width from props-->
	<v-card flat color="grey">

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

		<!--Dialog to write messages-->	
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
		

		<!-----------------Here starts the box of messages on Home page-------------->
		<v-card v-for="i in msgDataOk" :key="i._id" :width="ancho || 500" >
			<!--Header-->
			<v-card flat  tile class="d-flex justify-center mt-4" width="500">
			
				<!--menu btns(no used in this version) -->
				<v-card @click="hola()" class="d-flex justify-center flex-column" flat width="100%" >
					<v-icon block>more_horiz</v-icon>
				</v-card>
				
				<v-card flat width="100%" ></v-card>
				
				<!--avatar btn-->	
				<v-card flat width="100%" >
					
					<v-avatar class="mt-2 mb-2" size="50">
						<v-img
							:src=i.img
						/>
					</v-avatar>
				</v-card>
				<v-card flat width="100%" ></v-card>

				<!--Rank btns-->		
				<v-card flat class="d-flex align-center" width="100%">
					<v-card @click="hola()" flat  width="100%" >
						<v-icon block color="blue">
							keyboard_double_arrow_up
						</v-icon>
					</v-card>
					
					<v-card></v-card>
							
					<v-card @click="hola()" flat width="100%" >
						<v-icon block color="red" >
							keyboard_double_arrow_down
						</v-icon>
					</v-card>
				</v-card>
			</v-card>

			<v-divider  width="85%"></v-divider>
			
			<!--body-->
			<v-card flat  tile class="d-flex align-center flex-column " width="500">
				<v-card flat  width="100%">
					<v-card-title class="d-flex justify-center text-capitalize text-sm-h5">{{i.ownerName}}</v-card-title>
					<v-card-subtitle class="d-flex justify-start ">{{i.mdate}}</v-card-subtitle>
					<v-card-text class="text-subtitle-1 text-sm-body-1  text-justify"
						outlined
					>{{i.msg}}</v-card-text>
				</v-card>
			</v-card>
			<v-divider width="95%"></v-divider>
			
			<!--Public msg box buttons-->
			<v-card class="d-flex justify-center pa-2  mb-6" flat  width="500">
				<v-card @click="saveLike(i._id)" class="" flat  width="100%">
					<v-icon v-if="i.like==false" color="grey" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
					<v-icon v-if="i.like==true" color="#1e81b0" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Me gusta</span>
				</v-card>
			
				<v-card @click="hola(i._id)" flat  width="100%">
					<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">comment</v-icon>
					<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Comentar</span>
				</v-card>
				
				<v-card @click="hola(i._id)" flat  width="100%">
					<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">edit</v-icon>
					<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Editar</span>
				</v-card>
			</v-card>
		</v-card><!--End of messages box-->
	</v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
//import server's url
import {Global} from '../assets/global.js'
	
export default {
		name:'Show_Msg',

		props:{
			ancho:Number,
		},

		computed:{

			//Get date in a proper format to be present on web
			msgDataOk(){
				
				let msgData = this.msgData;

				for (let i=0;i<this.leng;i++){
					msgData[i].mdate = moment(this.msgData[i].mdate).format('LLL')
				}
				return msgData;
			},

		},

		created(){

			//Getting all messages when mounted.
			this.getMsg();
			
			this.getUserData();
	},


		data: function (){
			return {
				
				url:Global.url,
				msgData:'',
				leng:null,
				
				//writing box's variables
				msg:'',
				dialog:false,
				rules: [v => v.length <= 300 || 'Max 300 caracteres'],
				value: 'Escribe tu historia aqui...',
				savedDialog:false,

				msgObj:{
					ownerName:'',
					msg:'',
					img:'',
					whoVotes:[],
					whoLikes:[],
					like:false,
					mdate:moment(new Date()).format("LLL"),
				},

			}
		},
		
		methods:{
			hola(id){
				this.like=!this.like;
				console.log("funciona el boton: ",id);
			},
			
			
			//--Here starts the writing box's functions--//
			
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
				//this.msgObj.mdate = moment().format("LLL");
				
				//saving the object into DB
				axios
					.post(this.url+"saveMsg",this.msgObj)
					.then ((req)=>{

						if (req.data.status == "success"){
							
							this.savedDialog = true;
							this.msgData.splice(0,0,this.msgObj);
						}else{
							console.log("mensaje no pudo ser guardado");
						}

					}).catch((error)=>{
							console.log("error en la conexion con la BD",error);
	
					});
					
			},



			//--Here starts messages box functions--//
			//function to get messages
			getMsg(){
				axios
				.get(this.url+"getMsg")
				.then((res)=>{
					if (res.data.status=="success"){
						this.msgData=res.data.msgFound;
						this.leng=this.msgData.length;
						//call function that verifies if current user has gifted like to a msg
						//this.verifylikes();
						
						let user_name = localStorage.getItem("userName");
							for (let i=0; i<this.leng ;i++) {
								
							if (this.msgData[i].whoLikes.includes(user_name)){
								this.msgData[i].like = true;
							}
						}
					console.log("mensajes con like ",this.msgData);


					}

				}).catch((error)=>{
					console.log("request error, wasnt successful",error);
					});
			},

			saveLike (id){
				//set  msg's like clicked to true when pressed
				for (let i=0; i<this.leng ;i++) {

					if (this.msgData[i]._id.includes(id)){
						if(this.msgData[i].like == true){
							this.msgData[i].like = false;

							let user_name = localStorage.getItem("userName");
							let position = this.msgData[i].whoLikes.findIndex(user => user === user_name);
							if(position || position != -1){
									this.msgData[i].whoLikes.splice(position,1);
							console.log("new msgDatasplice",this.msgData);
							}

						}else{
								this.msgData[i].like = true;

								let user_name = localStorage.getItem("userName");
								
								if(this.msgData[i].whoLikes.includes(user_name)){
									console.log("");
								}else{
									this.msgData[i].whoLikes.push(user_name);
									console.log("msgData final: ",this.msgData);
								/*ready to save msg's likes status
									axios
									.put(this.url+"/"+id,this.msgData[i].like)
									.then((req)=>{
										if(req.data.status == "success"){
											console.log("cargue exitoso de los likes");
										}else console.log("hubo un error y no se actualizo el estados de los likes");
											
									}).catch((error)=>{
										console.log("no se pudo conectar con la BD",error);
										});*/
								}
							}
						}
					}
				}//end of saveLike
				
			},//end of methods


};
</script>

