<template>
			<!--Top bar-->
			<v-app-bar app color="#1e81b0 " dark>
				<img class="logo" src='../assets/groups.svg' alt='logogrupo' />
				<span class="ml-6 mb-n2 text-h5 font-weight-bold">Socialapp</span> 
				<v-spacer></v-spacer>
				<v-avatar v-if="loggedOut == true">
					<img
					src="https://cdn.vuetifyjs.com/images/john.jpg"
					alt="John"
					>
				</v-avatar>
			</v-app-bar>
</template>

<script>

export default {
	name: 'Main_Bar',
	
	props:{
		loggedOut:Boolean
	},

/*	data: () => ({
		loggedin:"",

	}),
	mounted(){
		this.loggedin = false;
}*/

};
</script>

