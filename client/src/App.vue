<template>
	<v-app>
		<v-app-bar app color="#1e81b0 " dark>
			<img class="logo" src='./assets/groups.svg' alt='logogrupo' />
			<span class="ml-6 mb-n2 text-h5 font-weight-bold">Socialapp</span> 
			<v-spacer></v-spacer>
			<v-avatar>
				<img
				src="https://cdn.vuetifyjs.com/images/john.jpg"
				alt="John"
				>
			</v-avatar>
		</v-app-bar>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
@import "./assets/styles.css"
</style>
