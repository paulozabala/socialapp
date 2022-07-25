<template>
	<v-app>
		<!--Top bar-->
		<v-app-bar app color="#1e81b0 " dark>
			
			<v-row flat  align="center" color="#1e81b0" width="100%" >
				<v-col class="d-flex justify-center"   flat cols="3" color="#1e81b0" width="">
					<v-col cols="2">
						<img class="logo" src='./assets/groups.svg' alt='logogrupo' />
					</v-col>
		
				<v-col class="d-flex align-center" cols="10">
					<span  v-if="$vuetify.breakpoint.width>450" 
						:class="$vuetify.breakpoint.width<=1435 ? 'ml-8 text-h6 font-weight-bold' : ' text-h5 font-weight-bold'"
					>Socialapp</span> 
				</v-col>
				</v-col>	
				<v-col flat cols="6" align="center" class="d-flex justify-space-around" color="#1e81b0" width="30%">
					<v-col cols="3"/>
					<v-btn @click="home()" icon >
						<v-icon size="45">home</v-icon>
					</v-btn>

					
					<v-btn icon @click="Profile()" >
						<v-icon size="45">account_circle</v-icon>
					</v-btn>
					<v-col cols="3"/>
				</v-col>
				<v-col flat cols="3" align="end" color="#1e81b0" width="30%">

					<v-row class="d-flex justify-end" v-if="loggedIn == false" flat color="#1e81b0" width="60%">
						<Reg_Form/>
					</v-row>

					<!--User's Logo Menu-->	
					<v-menu
						bottom
						min-width="200px"
						rounded
						offset-y
					>
						<template v-slot:activator="{ on }">
							<v-btn
								icon
								x-large
								v-on="on"
							>
								<v-avatar v-if="loggedIn == true">
									<img
									:src=route
									alt="avatar"
									>
								</v-avatar>
							</v-btn>
						</template>
						<v-card>
							<v-list-item-content class="justify-center">
								<div class="mx-auto text-center">

									<h3 class="text-capitalize">{{ user }}</h3>

									<v-divider class="my-3"></v-divider>
									<v-btn
										depressed
										rounded
										text
									>
										<Edit_Form/> Editar cuenta
									</v-btn>
									<v-divider class="my-3"></v-divider>
									<v-btn
										@click="disconnect()"
										depressed
										rounded
										text
									>
										Desc<v-icon>power_settings_new</v-icon>nectarse
									</v-btn>
								</div>
							</v-list-item-content>
						</v-card>
					</v-menu>
					
				</v-col>
			</v-row>

		</v-app-bar>

		<!--loadign otherviews-->
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
import Reg_Form from './components/RegForm.vue'
import Edit_Form from './components/EditForm.vue'
import axios from 'axios'
import {Global} from './assets/global.js'


export default {
	name: 'App',
	
	components:{
		Reg_Form,
		Edit_Form,
	},

	created() {
		let flag = localStorage.getItem("userName");
		if(flag){
			this.loggedIn=true;
			this.getUserData();
		}else {
			this.loggedIn=false;
			this.$router.push('/home/login-reg');
		}


	},
	
	data: function(){
		return{
			loggedIn:true,
			route:'',
			url:Global.url,
			user:'',
		}
	},


	methods:{
		
		//routing to homepage
		home(){
			let urltemp = this.$route.params;
			
			//to avoid self redirection errors
			if(urltemp!='' || urltemp!="/" || urltemp!=undefined ){
				this.$router.push("/");
			} //Dont do anything;
	},

		//Routing to profilepage
		Profile(){
			let user = localStorage.getItem("userName");
			let urltemp = this.$route.params.id;
			
			//to avoid self redirection errors
			if(urltemp!=user){
			this.$router.push("/"+user);
			} //Dont do anything;
		},

		disconnect(){
			localStorage.removeItem("userName");
			location.reload();
		},



		getUserData(){
			//clear userinfo¬
			this.userinfo='';

			//Getting id from params in actual url¬
			this.user = localStorage.getItem("userName");

			//Getting user's data¬
			axios
				.get(this.url+'searchProfile/'+this.user)
				.then((res)=>{
					if(res.data.status=="success"){
						this.userinfo = res.data.userFound[0];

						//creating the route for profile's avatar-img. couldnt be written in computed¬
						//it causes Get's problems because this.userinfo didnt charge fast enough.¬
						this.route = this.url+'getImage/'+this.userinfo.img;
					}else{
						//User doesnt exist
					}
				}).catch((error)=>{
					console.log("no fue posible conectar con la BD",error);
					});
		},//end of getUserData
},



};
</script>

<style>
@import "./assets/styles.css"
</style>
