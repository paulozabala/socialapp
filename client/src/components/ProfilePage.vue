<template>

	<v-card color="grey">
		
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
						<v-avatar  :size=" $vuetify.breakpoint.width<=290 ?'80' : '160'"  >
							<v-img src="../assets/avatar.jpeg"/>
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
				:width="$vuetify.breakpoint.width<=885 ? '530' : ''"
				max-height="800"
			>
				<v-card-title>
					Información personal
				</v-card-title>

				<v-card-subtitle>
					{{'description'}}
				</v-card-subtitle>

				<v-card-text>
					{{name+' '+lastname}}
				</v-card-text>
		
				<v-card-text>
					<span>Cumpleaños:</span> {{'birthday'}}
				</v-card-text>

				<v-card-text>
					{{'Sexo: sex'}}
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

						<v-card-text>
							{{'interests'}}
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
							{{'lookingfor'}}
						</v-card-text>
					</div>
				</v-expand-transition>
			</v-card> <!--end of information card -->
			
			<v-card :class="$vuetify.breakpoint.width<=885 ? 'd-flex align-center flex-column pa-0': 'd-flex align-center flex-column pa-0 ml-4'" color="grey" flat  width="530">
				<v-card flat outlined tile class="mt-0" v-for="i in 4" :key="i" color="grey" width="530">
					<Show_Msg :ancho="530" />
				</v-card><v-spacer></v-spacer>
			</v-card>
		</v-card><!--body end-->



	<!--dialogs for changing pictures and ...-->
	<v-dialog v-model="picsDialog" width="400"><v-card cols="12" class="d-flex align-center flex-column pa-4" width="100%"  >
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
import Show_Msg from '../components/ShowMsg.vue'
import axios from 'axios'
import {Global} from "../assets/global.js"


export default{
	name:'Profile_Page',

	components:{
		Show_Msg,
	},

	computed:{

		login(){

			let localst = localStorage.getItem('userName');
			let route = this.$route.params.id;
			
			if (route == localst){
				return true;

			}else return false;
		},


	},


	data:function(){
		return{
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
};
	},

	methods:{
		changePic(){
			this.picsDialog=true;
		},

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
		}




	}

};


</script>
