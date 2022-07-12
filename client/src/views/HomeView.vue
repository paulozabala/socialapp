<template>
	<container class="d-flex align-center flex-column">
		<row  class="mt-6 col-12 ">
			<Vote_Rank />
		</row>
	
		<row class="mt-10 mb-16">
			<v-card class="d-flex justify-center" width="400" outlined>
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
						label="¿Quieres compartir algo?"
						outlined
						rounded
					></v-text-field>
				</v-col>
			</v-card>
			<v-card outlined tile  class="d-flex justify-center">
				<v-col cols="6">
					<v-btn text width="auto">
						<v-icon color="#1e81b0" class="material-icons mr-2">add_photo_alternate
						</v-icon>
						foto
					</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn text width="">
						enviar
					</v-btn>
				</v-col>
			</v-card>
		</row>

		<row class="mt-10 mb-16">
			<v-card class="d-flex justify-center" width="400">
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
						label="¿Quieres compartir algo?"
						outlined
						rounded
					></v-text-field>
				</v-col>
			</v-card>
			<v-card>
					
				<v-btn text class="text-button">
					<v-icon color="#1e81b0" class="material-icons mr-2">thumb_up
					</v-icon>
					me gusta
				</v-btn>
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
