<template>
	<v-container>
		<v-row align="start" >
			<v-col  align="center" >
				<!--calling voting rank-->
				<Vote_Rank />
				<Create_Msg/>
				<Show_Msg/>
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
