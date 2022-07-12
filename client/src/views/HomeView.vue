<template>
	<container class="d-flex align-center flex-column">
		<row>
			<Vote_Rank />
		</row>
		<row>
			<v-card width="450">
				<v-col cols="2">
					<v-avatar>
						<v-img
							src="../assets/avatar.jpeg"
						/>
					</v-avatar>
				</v-col>
				<v-col  cols="10">
					<v-text-field
						v-model="first"
						label="First Name"
						outlined
						rounded
				></v-text-field>
				</v-col>
			</v-card>
		</row>
	


	</container>




</template>

<script>
import Vote_Rank from '../components/VoteRank.vue'
export default {
	name: 'Home_View',

	components: {
		Vote_Rank,
},
}
</script>
