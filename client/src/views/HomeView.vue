<template>
	<container>
		<row>
			<Vote_Rank />
		</row>
		<row>
			<v-card>
				<v-col>
					<v-avatar>
					
					</v-avatar>
				</v-col>

				<v-text-field
					v-model="first"
					label="First Name"
					outlined
					rounded
				></v-text-field>
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
