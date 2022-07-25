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
					>
						{{i.msg}}
					</v-card-text>
				</v-card>
			</v-card>
			<v-divider width="95%"></v-divider>
			
			<!--Public msg box buttons-->
			<v-card class="d-flex justify-center pa-2 mb-4" flat  width="500">
				<v-card  @click="prepareLike(i._id)" class="" flat  width="100%">
					<v-icon v-if="i.like==false" color="grey" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
					<v-icon v-if="i.like==true" color="#1e81b0" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Me gusta</span>
				</v-card>
				
				<v-card @click="comment(i._id)" flat  width="100%">
					<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">comment</v-icon>
					<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Comentar</span>
				</v-card>
				
				<v-card @click="hola()" flat  width="100%">
					<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">edit</v-icon>
					<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Editar</span>
				</v-card>
			</v-card>
			
			<!------------------Comments box------------------->
			<v-card v-show="i.comment" flat tile class="mb-4" width="" color="grey" height="170">
				<v-card  flat  tile color="#F4F4F5"  >
					<v-card-text class="" flat width="200" height="50" color="">
						<v-card
							class="mb-2 d-flex justify-end align-center "
							flat
							width="90%"
							height="40"
							color="#F4F4F5"
						>
							<v-avatar
								color="grey"
								class="mr-4"
								size="40"
							>
								<v-img :src=route />
							</v-avatar>
							<v-card flat  class="d-flex justify-start" color="#F4F4F5" width="25%">
								<strong class="text-subtitle-2">{{userInfo.userName}} </strong>
							</v-card>
		
							<v-card flat class=" d-flex justify-end ml-auto" width="60%" color="#F4F4F5">
								<v-btn @click="sendComment(i._id)" small outlined>Enviar</v-btn>
							</v-card>

						</v-card>
							
						<v-card flat tile   width="90%"  color="#F4F4F5">
							
							<v-card flat class="d-flex align-center " height="70" color="#F4F4F5">
								<v-textarea
									v-model="commentObj.comment"
									auto-grow
									filled
									color="#1e81b0"
									rows="1"
								></v-textarea>
							</v-card>
							<v-card flat tile class="d-flex justify-center mb-4" height="10" color="#F4F4F5">
								<v-card flat width="100%" color="#F4F4F5">
									<a @click="bringComments(i._id)">Ver comentarios...</a>
								</v-card>
							</v-card>
						</v-card>
					</v-card-text>
				</v-card>
			</v-card><!--end of comment box-->
		</v-card><!--end of msg box--->

		<!---------------------Dialog to display comments by msgID------------------------>
		<v-dialog v-model="commentsDialog" width="400">
			<v-card cols="12" class="d-flex align-center flex-column pa-4" width="100%"  >
				<v-card-text v-for="c in commentsContainer" :key="c._id"  flat tile class=" pa-6" color="white"  width="100%" >
					<v-card flat shaped tile color="#F4F4F5"  >
						<v-card-text class="" flat width="200" height="50" color="">
							<v-card
								class="mb-2 d-flex justify-end align-center "
								flat
								width="100%"
								height="40"
								color="#F4F4F5"
							>
								<v-card flat  width="15%" color="#F4F4F5">
									<v-avatar
										color="grey"
										class="mr-4"
										size="40"
										
									>
										<v-img :src=c.img />
									</v-avatar>
								</v-card>
								<v-card flat class="ml-2" width="25%" color="#F4F4F5">
									<strong class="text-subtitle-2">{{c.ownerName}} </strong>
								</v-card>
								<v-card flat class=" d-flex justify-end " width="60%" color="#F4F4F5">
									<v-btn @click="editComment()" small outlined>Editar</v-btn>
								</v-card>
							</v-card>
								
							<v-card flat tile   width="100%"  color="#F4F4F5">
								
								<v-card flat class="d-flex align-center " color="#F4F4F5">
									<v-textarea
										v-model="c.comment"
										auto-grow
										filled
										color="#1e81b0"
										rows="1"
										disabled
									></v-textarea>
								</v-card>
							</v-card>
						</v-card-text>
					</v-card>
				</v-card-text>
				<v-card-actions flat tile class="d-flex justify-center" width="100%">
					<v-btn text @click="commentsDialog = false" color="blue accent-8">
						<v-icon>check_circle</v-icon>
						<span>Aceptar</span>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

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
					comment:false,
					mdate:moment(new Date()).format("LLL"),
				},
				commentObj:{
					msgID:'',
					comment:'',
					ownerName:'',
					img:'',
					comDate:moment(new Date()).format("LLL"),
				},
				
				commentsContainer:'',
				commentsDialog:false,
				userInfo:'',
				n:0,
				bio:'',
			}
		},
		
		methods:{
			hola(){
				alert("funciona el componente Show_Msg");
			},

			editComment(){
				alert("no disponible en esta version");
			},

			comment(msgID){
				console.log("aqui esta el panel",msgID);
				for (let i=0;i<this.leng;i++){
					if(this.msgData[i]._id == msgID){
						if (this.msgData[i].comment==true){
							this.msgData[i].comment=false;
						}else this.msgData[i].comment=true;
					}else this.msgData[i].comment=false;
				}
			},

			//function to get user's messages
			getMsgByOwner(id){
				axios
				.get(this.url+"getMsgByOwner/"+id)
				.then((res)=>{
					if (res.data.status=="success"){
						this.msgData=res.data.msgFound;
						this.leng=this.msgData.length;
						
						this.msgData.map(function(m){
							m.comment = false;
						});


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
							this.userInfo = res.data.userFound[0];
							
							//creating the route for profile's avatar-img. couldnt be written in computed
							//it causes Get's problems because this.userinfo didnt charge fast enough.
								this.route = this.url+'getImage/'+this.userInfo.img;
					}

					}).catch((error)=>{
						console.log("no fue posible conectar con la BD",error);
						});
			},

			//getComments
			bringComments(msgID){
				
				axios
				.get(this.url+'getComments/'+msgID)
				.then((res)=>{
					if(res.data.status == "success"){

						this.commentsContainer=res.data.commentsFound;
						console.log("comentarios hallados",this.commentsContainer);
						this.commentsDialog=true;
					}


				}).catch((error)=>{
					console.log("error al conectarse con la base de datos",error);
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

			sendComment(msgID){
				console.log("codigodel mensaje",msgID);
				//Preparing comment object before being sended to DB
				this.commentObj.msgID = msgID;
				this.commentObj.ownerName = localStorage.getItem("userName");
				this.commentObj.img = this.route;


				//saving the object into DB
				axios
					.post(this.url+"saveComment",this.commentObj)
					.then ((req)=>{

						if (req.data.status == "success"){
							
							//Dont do anything except delete the comment.
							this.commentObj.comment = '';

						}else{
							console.log("mensaje no pudo ser guardado");
						}

					}).catch((error)=>{
							console.log("error en la conexion con la BD",error);
	
					});
					
			},


		},//methods ending
};
</script>

