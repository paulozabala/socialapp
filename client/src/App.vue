<template>
	<v-app>
		<!--loadign main bar-->
		<Main_Bar/>
		<!--loadign otherviews-->
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
import Main_Bar from './components/MainBar.vue'
export default {
	name: 'App',
	components:{
		Main_Bar
}
};
</script>

<style>
@import "./assets/styles.css"
</style>
