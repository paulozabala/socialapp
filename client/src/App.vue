<template>
	<v-app>
		<!--Top bar-->
		<v-app-bar app color="#1e81b0 " dark>
			<img class="logo" src='./assets/groups.svg' alt='logogrupo' />
			<span  v-if="$vuetify.breakpoint.width>316" :class="$vuetify.breakpoint.width<=350 ? 'ml-1 mb-n2 text-h6 font-weight-bold' : 'ml-6 mb-n2 text-h5 font-weight-bold'">Socialapp</span> 
			<v-spacer></v-spacer>
			<v-avatar v-if="loggedIn == true">
				<img
				src="https://cdn.vuetifyjs.com/images/john.jpg"
				alt="John"
				>
			</v-avatar>

			<v-card v-if="loggedIn == false" flat color="#1e81b0" width="150">
				<Reg_Form/>
			</v-card>
		</v-app-bar>

		<!--loadign otherviews-->
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
import Reg_Form from './components/RegForm.vue'

export default {
	name: 'App',
	
	components:{
		Reg_Form
	},

	created() {
		let flag = localStorage.getItem("userName");
		if(flag){
			this.loggedIn=true;
		}else {
			this.loggedIn=false;
			this.$router.push('/home/login-reg');
		}
	},
	
	data: function(){
		return{
			loggedIn:true,
		}
	},
};
</script>

<style>
@import "./assets/styles.css"
</style>
