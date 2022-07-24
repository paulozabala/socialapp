<template>
	<!--Home public msg box(head&body) it has dynamic card's width from props-->
	<v-card flat color="grey">
	<v-card v-for="i in msgDataOk" :key="i._id" :width="ancho || 500" >
		<!--Header-->
		<v-card flat  tile class="d-flex justify-center mt-0" width="500">
		
			<!--menu btns(no used in this version) -->
			<v-card @click="hola()" class="d-flex justify-center flex-column" flat width="100%" >
				<v-icon block>more_horiz</v-icon>
			</v-card>
			
			<v-card flat width="100%" ></v-card>
			
			<!--avatar btn-->	
			<v-card flat width="100%" >
				
				<v-avatar class="mt-2 mb-2" size="50">
					<v-img
						:src=route
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

		<v-divider width="85%"></v-divider>
		
		<!--body-->
		<v-card flat  tile class="d-flex align-center flex-column mt-2 " width="500">
			<v-card flat  width="100%">
				<v-card-title class="d-flex justify-center text-sm-h5 text-capitalize">{{i.ownerName}}</v-card-title>
				<v-card-subtitle class="d-flex justify-start ">{{i.mdate}}</v-card-subtitle>
				<v-card-text class="text-caption text-sm-body-1  text-justify"
					outlined
				>{{i.msg}}</v-card-text>
			</v-card>
		</v-card>
		<v-divider width="95%"></v-divider>
		
		<!--Public msg box buttons-->
		<v-card class="d-flex justify-center pa-2  mb-6" flat  width="500">
			<v-card  @click="prepareLike(i._id)" class="" flat  width="100%">
				<v-icon v-if="i.like==false" color="grey" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
				<v-icon v-if="i.like==true" color="#1e81b0" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
				<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Me gusta</span>
			</v-card>
			
			<v-card @click="hola()" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">comment</v-icon>
				<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Comentar</span>
			</v-card>
			
			<v-card @click="hola()" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">edit</v-icon>
				<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Editar</span>
			</v-card>
		</v-card>
	</v-card>

	<!--Default Message it is displayed when User doesnt have created a Msg yet-->
	<v-card v-if="!msgDataOk">
		<v-card-title class="text-h5 red lighten-2" ><span class="white--text">¡Ups! ¡Parece que aún no tienes mensajes!</span></v-card-title>
		<v-card-text class="text-h6 pa-4 ">
			{{'No tienes un mensaje aún creado,Sin embargo ¿Qué esperas?'+
			' ve y cuentale al mundo sobre todo aquello que te apasiona!'}}
			<v-spacer></v-spacer>
			<v-img class="mt-4" width="60%" :src=this.initimg />
		</v-card-text>


	</v-card>





	</v-card>
</template>

<script>
import axios from 'axios'
//import server's url
import {Global} from '../assets/global.js'
import moment from 'moment'
	
export default {
		name:'Profile_Msg',

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

			//Getting user's messages when mounted //every Msg is associated with the user's name.
			//Verify user credentials.
			//Extracting id from localStorage
			//let userID = localStorage.getItem("userName");
			
			//Get id from params.
			let params = this.$route.params.id;

			//if (userID == params ){
			//	this.getMsgByOwner(params);
			//}else {
			//	console.log("usuario no reconocido");
			this.getMsgByOwner(params);
			//}
			
			//Get user's data to fill profile and msg information.

			this.getUserData();

		},


		data: function (){
			return {
				
				url:Global.url,
				initimg:Global.initImg,
				route:'',
				msgData:'',
				msg:'',
				leng:null,
				msgObj:{
					ownerName:'',
					msg:'',
					img:'',
					whoVotes:['default'],
					whoLikes:[],
					like:false,
					mdate:moment(new Date()).format("LLL"),
				},
			}
		},
		
		methods:{
			hola(){
				alert("funciona el componente Show_Msg");
			},

			//function to get user's messages
			getMsgByOwner(id){
				axios
				.get(this.url+"getMsgByOwner/"+id)
				.then((res)=>{
					if (res.data.status=="success"){
						this.msgData=res.data.msgFound;
						this.leng=this.msgData.length;

						//Check if the user has likes on every msg and sets true
						//the like flag of local msg object to be rendered on webpage.
						let user_name = localStorage.getItem("userName");
							for (let i=0; i<this.leng ;i++) {
								
								if (this.msgData[i].whoLikes.includes(user_name)){
								this.msgData[i].like = true;
								}else this.msgData[i].like = false;
						}
					}

				}).catch((error)=>{
					console.log("request error, wasnt successful",error);
					});
			},

			getUserData(){
				//Getting id from params in actual url
				let user = this.$route.params.id;
					
				//Getting user's data
				axios
					.get(this.url+'searchProfile/'+user)
					.then((res)=>{

						if(res.data.status=="success"){
							this.userinfo = res.data.userFound[0];
							
							//creating the route for profile's avatar-img. couldnt be written in computed
							//it causes Get's problems because this.userinfo didnt charge fast enough.
								this.route = this.url+'getImage/'+this.userinfo.img;
					}

					}).catch((error)=>{
						console.log("no fue posible conectar con la BD",error);
						});
			},

			//Prepare liked msg to be updated
			prepareLike (id){

				let user_name = localStorage.getItem("userName");
				
				//set  msg's like clicked to true when pressed
				for (let i=0; i<this.leng ;i++) {

					if (this.msgData[i]._id.includes(id)){

						if (this.msgData[i].whoLikes.includes(user_name)){
							this.msgData[i].like = false;
							let position = this.msgData[i].whoLikes.findIndex(user => user === user_name);
							if(position || position != -1){
								
								//takes out username from msg local object
								this.msgData[i].whoLikes.splice(position,1);
							
								//calling function to update like's info in BD
								this.updateBD(id,i);
								}
						}else{
							this.msgData[i].like = true;

							//push into local msg object the user wholikes
							this.msgData[i].whoLikes.push(user_name);
								//calling function to update like's info in BD
								this.updateBD(id,i);
						}
					}
				}

			},//end of prepareLike
				
			updateBD(id,i){

					//ready to save msg's likes status
					axios
						.put(this.url+"updateMsg/"+id,this.msgData[i])
						.then((req)=>{
							if(req.data.status == "success"){
								//cargue exitoso de los likes
							}else console.log("hubo un error y no se actualizo el estados de los likes");
								
						}).catch((error)=>{
							console.log("no se pudo conectar con la BD",error);
							});

			},//updateBD funct. ends



		},//methods ending

};
</script>

