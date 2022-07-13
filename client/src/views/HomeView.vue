<template>
	<container class="d-flex align-center flex-column">

		<row  class="mt-6 col-12 ">
			<Vote_Rank />
		</row>
	
		<row class="mt-10 mb-6">
			<v-card outlined tile class="d-flex justify-center" width="400" >
				<v-col cols="2">
					<v-avatar>
						<v-img
							src="../assets/avatar.jpeg"
						/>
					</v-avatar>
				</v-col>
				<v-col  cols="10">
					<v-text-field
						v-model="messages"
						label="¿Quieres compartir algo?"
						outlined
						rounded
					></v-text-field>
				</v-col>
			</v-card>
			<v-card flat outlined tile  class="d-flex justify-center">
				<v-card flat  cols="6" width="50%" >
					<v-btn text block plain >
						<v-icon color="#1e81b0" class="material-icons mr-2">add_photo_alternate
						</v-icon>
						foto
					</v-btn>
				</v-card>
				<v-card flat cols="6" width="50%">
					<v-btn text block  plain>
						<v-icon class="mr-2">send</v-icon>
						enviar
					</v-btn>
				</v-card>
			</v-card>
		</row>

		<row class="mb-6">
			<v-card outlined tile class="d-flex justify-center" width="400">
				<v-col cols="2">
					<v-avatar class="mt-4">
						<v-img
							src="../assets/avatar.jpeg"
						/>
					</v-avatar>
				</v-col>

				<v-col  cols="10">
					<v-card-title>{{user}}</v-card-title>
					<v-card-subtitle>{{time}} </v-card-subtitle>
					<v-card-text class="text-body-1  text-justify"
						v-model="messages"
						outlined
					>{{longmsg}}</v-card-text>
				</v-col>
			</v-card>
			<v-card outlined tile>
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
import moment from 'moment'
export default {
	name: 'Home_View',

	components: {
		Vote_Rank,
},
	data: function(){
		return{
			messages:'hoy vi que faltaba un pedazo de mi corazón, eras tú!!! sin tanto despecho dijo ella con su corazon de piedra y alma fria sin amor.',
			user: 'Fabiano Spaguetti',
			time: moment().format('h:mm:ss a'),//Date.now()
			longmsg: "Lorem ipsum dolor sit amet consectetur adipiscing elit, aenean cubili a enim vulputate vehicula est facilisis, ac libero varius diam maecenas leo. Curabitur inceptos quis integer diam cras velit sollicitudin, fames a id ligula cursus torquent, sagittis habitasse eros cubilia in odio. Libero ridiculus facilisi mattis eu vehicula sodales cras dictum consequat mollis himenaeos, nec posuere commodo per hac feugiat scelerisque sollicitudin potenti id volutpat curabitur, enim curae eget montes maecenas nunc phasellus tellus suscipit luctus. Vestibulum habitant posuere condimentum dictumst nostra euismod primis, nisi mus cubilia aliquet mattis dignissim accumsan, vehicula non luctus cum tellus integer, suspendisse nibh penatibus faucibus malesuada fermentum. Massa pretium posuere natoque quisque a condimentum sem risus, montes fames magna himenaeos eleifend vestibulum conubia sociis taciti, nullam felis facilisi leo habitant enim cras. Maecenas suspendisse torquent laoreet taciti justo vel iaculis, convallis in venenatis aenean nunc ac interdum, diam nascetur feugiat rutrum massa nibh."		


}
	},


}
</script>
