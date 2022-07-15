<template>
	<v-container fluid>
		<v-row align="start" >
			<v-col class="pa-0"  align="center" >
				<Profile_Page/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Profile_Page from '../components/ProfilePage.vue'

export default{
	name:'Profile_View',
	components:{
		Profile_Page,
	},

};

</script>

