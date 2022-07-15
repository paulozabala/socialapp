<template>
	<v-container fluid>
		<v-row align="start" color="grey" >
			<v-col class="pa-0" align="center" color="grey" >
				
				<v-card class="pa-2" flat color="grey">
					<!--calling voting rank-->
					<v-card class="" flat color="grey" >
						<Vote_Rank />
					</v-card>
					
					<!--calling box to create msg-->
					<v-card flat color="grey">
						<Create_Msg/>
					</v-card>

					<!--calling msgs from db-->
					<v-card class="d-flex align-center flex-column mt-6 " flat color="grey" width="500">
						<v-card v-for="i in 4" :key="i" flat color="grey">
							<Show_Msg :ancho="500"/>
						</v-card>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</v-container>




</template>
//debo agregar css para  la card
<script>
import Vote_Rank from '../components/VoteRank.vue'
import Create_Msg from '../components/CreateMsg.vue'
import Show_Msg from '../components/ShowMsg.vue'

export default {
	name: 'Home_View',

	components: {
		Vote_Rank,
		Create_Msg,
		Show_Msg
	},
 
	data: function(){
		return{
			messages:'hoy vi que faltaba un pedazo de mi corazón, eras tú!!! sin tanto despecho dijo ella con su corazon de piedra y alma fria sin amor.',
			
		}
	},

	methods:{
		hola(){
			alert("funciona metodos");
		}
}


};
</script>
