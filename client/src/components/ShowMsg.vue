<template>
	<!--Home public msg box(head&body) it has dynamic card's width from props-->
	<v-card color="blue">
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
						src="../assets/avatar.jpeg"
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
				<v-card-title class="d-flex justify-center text-sm-h5">{{'userID: '+i.ownerID}}</v-card-title>
				<v-card-subtitle class="d-flex justify-start ">{{i.date}}</v-card-subtitle>
				<v-card-text class="text-caption text-sm-body-1  text-justify"
					v-model="messages"
					outlined
				>{{i.msg}}</v-card-text>
			</v-card>
		</v-card>
		<v-divider width="95%"></v-divider>
		
		<!--Public msg box buttons-->
		<v-card class="d-flex justify-center pa-2  mb-6" flat  width="500">
			<v-card  @click="hola()" class="" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
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
	</v-card>
</template>

<script>
import axios from 'axios'
//import server's url
import {Global} from '../assets/global.js'
import moment from 'moment'
	
export default {
		name:'Show_Msg',

		props:{
			ancho:Number
		},

		computed:{

			//Get date in a proper format to be present on web
			msgDataOk(){
				
				let msgData = this.msgData;

				for (let i=0;i<this.leng;i++){
					msgData[i].date = moment(this.msgData[i].date).format('LLL')
				}
				return msgData;
			},

		},


		mounted() {
			
			//Getting messages data when mounted.
			this.getMsg();
						},


		data: function (){
			return {
				
				url:Global.url,
				msgData:'',
				leng:null,
				//test variables
				user: 'Fabiano Spaguetti',
				time: moment().format('h:mm a'),//Date.now()

				messages:'hoy vi que faltaba un pedazo de mi corazón, eras tú!!!'+ 
					'sin tanto despecho dijo ella con su corazon de piedra y alma fria sin amor.',
				longmsg:'Lorem ipsum dolor sit amet consectetur adipiscing elit,'+
					'aenean cubili a enim vulputate vehicula est facilisis, ac libero varius'+
					'diam maecenas leo. Curabitur inceptos quis integer diam cras velit'+
					' sollicitudin, fames a id ligula cursus torquent, sagittis habitasse'+
					' eros cubilia in odio. Libero ridiculus facilisi mattis eu vehicula',
			}
		},
		
		methods:{
			hola(){
				alert("funciona el componente Show_Msg");
			},

			//function to get messages
			getMsg(){
				axios
				.get(this.url+"getMsg")
				.then((res)=>{
					if (res.data.status=="success"){
						console.log("msgFound es:",res.data.msgFound);
						this.msgData=res.data.msgFound;
						console.log("msgData es:",this.msgData[2]);
						this.leng=this.msgData.length;
					}

				}).catch((error)=>{
					console.log("request error, wasnt successful",error);
					});
			},
		},

};
</script>

