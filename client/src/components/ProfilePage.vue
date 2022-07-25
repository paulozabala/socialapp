<template>

	<v-card flat color="grey">
		<!--alert for user's profile unexistence-->
		<v-alert v-model="bar"
			color="red"
			dark
			icon="report_problem"
			border="right"
		>
			{{bartext}}
		</v-alert>

		<!--Header's profile-->
		<v-card flat  color="grey" height="60%" >
			
			<!--Frontpage picture-->
			<v-card flat tile  width="90%" max-width="1720px">
				<v-card flat class="" >
					<v-img src="../assets/portadafb.png" max-height="300px"/>
				</v-card>
			</v-card>

			<!--Avatar-->
			<v-card flat  rounded="lg t-0"  width="90%" max-width="1720px" color="" :height="$vuetify.breakpoint.width<=290 ? '20' : '90'">
				
				<!--Avatar photo-->
				<v-row   :class="$vuetify.breakpoint.width>=960 ? 'avatarfixleft' : 'avatarfixmid '" style="">
					<v-col cols="2" md="1" lg="1" xl="0" color="blue accent-8" size="50"></v-col>
					<v-col cols="8" md="3" lg="2" xl="2" >
						<v-avatar  :size=" $vuetify.breakpoint.width<=290 ?'80' : '160'" >
							<v-img :src=route />
						</v-avatar>
					</v-col>
					<v-col cols="2" md="8" lg="9" xl="10" ></v-col>
				</v-row>
			</v-card>

			<!--change-photo's icon-->
			<v-card v-if="login" flat  rounded="lg t-0"  width="90%" max-width="1720px" color=""  height="10">
				<v-row :class="$vuetify.breakpoint.width>=960 ? 'avatarfixleft' : 'avatarfixmid '" width="90%" >
					<v-col cols="1" md="1" lg="1" xl="0" color="blue accent-8" size="50"></v-col>

						<!--for responsive it activates if breakpoint > 290 and becomes a btn with tooltip-->
						<v-col v-if="$vuetify.breakpoint.width>290" cols="10" md="3" lg="2" xl="2" >
							<v-tooltip right>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon @click="changePic()" style="position:relative;left:80px;top:40px;" v-bind="attrs" v-on="on">
										<v-icon  color="blue accent-8" size="30">filter_tilt_shift</v-icon>
									</v-btn>
								</template>
								<span>cambiar foto</span>
							</v-tooltip>
						</v-col>
						
						<!--for responsive design it activates if breakpoint <= 290 and works as a button only-->						<v-col v-if="$vuetify.breakpoint.width<=290" cols="12"  class="" >

									<v-btn block @click="changePic()" style="position:relative;top:60px;" x-small >
										<v-icon  color="blue accent-8" size="20">filter_tilt_shift</v-icon>
										<span>Cambiar foto</span>
									</v-btn>
						</v-col>
				<v-col cols="1" md="8" lg="9" xl="10" ></v-col>
				</v-row>
			</v-card>
		</v-card>

		<!--body-->
		<v-card :class="$vuetify.breakpoint.width<=885 ? 'd-flex align-center flex-column mt-4' : 'd-flex justify-center mt-4'  " flat color="grey" width="90%" >
			<!--Information card-->
			<v-card class="mb-4"
				:width="$vuetify.breakpoint.width<=885 ? '530' : '400'"
				max-height="800"
			>
				<v-card-title class="d-flex justify-center text-h5">
					Información personal
				</v-card-title>
				
				<v-card-subtitle class="d-flex justify-center text-h6 text-capitalize">
					{{userinfo.name+' '+userinfo.lastname}}
				</v-card-subtitle>

				<v-card-text class="d-flex justify-start text-justify">
					{{userinfo.description}}
				</v-card-text>

				<v-card-text class="d-flex justify-start text-justify">
					<span class="mr-2">Cumpleaños: </span> {{birthdate}}
				</v-card-text>

				<v-card-text class="d-flex justify-start text-justify">
					<span class="mr-2">Sexo:</span> {{sexfix}}
				</v-card-text>

				<!--card's actions & transitions-->
				<v-card-actions>
					<v-btn
						color="#1e81b0"
						text
					>
						Intereses
					</v-btn>
					<v-spacer></v-spacer>

					<v-btn
						icon
						@click="show = !show"
					>
						<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>
				
				<v-expand-transition>
					<div v-show="show">
						<v-divider width="90%"></v-divider>

						<v-card-text v-for="interest in this.userinfo.interests" :key="interest">
							{{interest}}
						</v-card-text>
					</div>
				</v-expand-transition>

				<v-card-actions>
					<v-btn
						color="#1e81b0"
						text
					>
						Buscando
					</v-btn>
					<v-spacer></v-spacer>

					<v-btn
						icon
						@click="busco = !busco"
					>
						<v-icon>{{ busco ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>

				<v-expand-transition>
					<div v-show="busco">
						<v-divider width="90%"></v-divider>

						<v-card-text>
							{{lookingfix}}
						</v-card-text>
					</div>
				</v-expand-transition>
			</v-card> <!--end of information card -->
			
			<v-card flat :class="$vuetify.breakpoint.width<=885 ? 'd-flex align-center flex-column pa-0': 'd-flex align-center flex-column pa-0 ml-4'" color="grey"  width="530">
				<v-card flat outlined tile class="mt-0" color="grey" width="530">
					<Profile_Msg :ancho="530" />
				</v-card><v-spacer></v-spacer>
			</v-card>
		</v-card><!--body end-->



			<!-- dialog for changing profile picture -->
		<v-dialog v-model="picsDialog" width="400">
			<v-card cols="12" class="d-flex align-center flex-column pa-4" width="100%"  >
				<v-card-title :class="$vuetify.breakpoint.width<=290 ? 'text-body-2' : '' ">Carga tu archivo</v-card-title>
				<v-card-text flat tile class="d-flex justify-start pa-6" color="white"  width="100%" >
					<v-file-input
						v-model="files"
						:rules="rules"
						accept="image/png, image/jpeg, image/bmp"
						placeholder="Pick an avatar"
						prepend-icon="mdi-camera"
						label="Avatar"
					></v-file-input>
				</v-card-text>

				<v-card-actions flat tile class="d-flex justify-center" width="100%">
					<v-btn text @click="sendFile()" color="blue accent-8">
						<v-icon>save</v-icon>
						<span>Guardar</span>
					</v-btn>
				</v-card-actions>
			</v-card>

		</v-dialog>
	</v-card>

</template>

<script>
import Profile_Msg from '../components/ProfileMsg.vue'
import axios from 'axios'
import moment from 'moment'
import {Global} from "../assets/global.js"


export default{
	name:'Profile_Page',

	components:{
		Profile_Msg,
	},

	computed:{
		
		//variable for verifying user's edit privileges
		login(){

			let localst = localStorage.getItem('userName');
			let route = this.$route.params.id;
			
			if (route == localst){
				return true;

			}else return false;
		},

		//fixing variables according to showing needs
		interestsin(){
			return this.userinfo.interests[0];
			},

		birthdate(){
			let birthday = moment(this.userinfo.birthday).add(1,'day').format("MMM DD");
			return birthday;
		},

		lookingfix(){

			let look = this.userinfo.lookingfor;
			return this.lookingarray[look];
		},

		sexfix(){

			let sx = this.userinfo.sex;
			return this.sexarray[sx];
		},

	},

	created(){
		this.getUserData();

	},

	data:function(){
		return{

			userinfo:'',
			description:'',
			name:'',
			lastname:'',
			birthday:'',
			sex:'',
			interests:'',
			lookingfor:'',
			show:false,
			busco:false,
			picsDialog:false,
			files:null,
			rules: [
				value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
			],
			url:Global.url,
			initUserImg:Global.initUserImg,
			bar:false,
			bartext:'Usuario No Existe en Nuestros Registros',
			lookingarray:Global.lookingarray,
			sexarray:Global.sexarray,
			route:'',
		};
	},

	methods:{

		//Flag that calls a dialog to change the user's profile picture
		changePic(){
			this.picsDialog=true;
		},
		
		//Sending the picture to server and saving the pictures name into the user DB
		sendFile(){

			let formData = new FormData()
			
			if (this.files){

				formData.append('id',this.files,this.files.name);

				let user = localStorage.getItem("id")
				axios
				.post(this.url+'saveImage/'+ user, formData)
				.then((req)=>{
					if (req.data.status=="success"){
						location.reload()
						
					}else alert("Archivo no pudo ser Guardado");

				}).catch((error)=>{
					alert("error al conectar con el servidor: ",error);

					});

			}else alert("No files found");
		},

		getUserData(){
			//clear userinfo
			this.userinfo='';
			//this.route=this.url+'getImage/'+this.initUserImg;
			
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
				}else{
					this.bar=true;
				}

				}).catch((error)=>{
					console.log("no fue posible conectar con la BD",error);
					});
		}

	}

};


</script>
