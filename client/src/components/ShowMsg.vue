<template>
	<!--Home public msg box(head&body) it has dynamic card's width from props-->
	<v-card :width="ancho || 500">
		<!--Header-->
		<v-card flat  tile class="d-flex justify-center mt-0" width="500">
			<v-card flat width="100%" ></v-card>
			<v-card flat width="100%" ></v-card>
			<v-card flat width="100%" >
				<v-avatar class="mt-2 mb-2" size="50">
					<v-img
						src="../assets/avatar.jpeg"
					/>
				</v-avatar>
			</v-card>
			<v-card flat width="100%" ></v-card>
			<v-card flat class="d-flex align-center" width="100%">
				<v-card flat @click="hola()" width="100%" >
					<v-icon block color="blue">
						keyboard_double_arrow_up
					</v-icon>
				</v-card>
				
				<v-card></v-card>
						
				<v-card flat  @click="hola()" width="100%" >
					<v-icon block color="red" >
						keyboard_double_arrow_down
					</v-icon>
				</v-card>
			</v-card>
		</v-card>

		<v-divider width="85%"></v-divider>
		
		<!--body-->
		<v-card flat  tile class="d-flex align-center flex-column mt-2 " width="500">
			<v-card flat  width="100%">
				<v-card-title class="d-flex justify-center text-sm-h5">{{user}}</v-card-title>
				<v-card-subtitle class="d-flex justify-start ">{{time}}</v-card-subtitle>
				<v-card-text class="text-caption text-sm-body-1  text-justify"
					v-model="messages"
					outlined
				>{{longmsg}}</v-card-text>
			</v-card>
		</v-card>
		<v-divider width="95%"></v-divider>
		
		<!--Public msg box buttons-->
		<v-card class="d-flex justify-center pa-2  mb-6" flat  width="500">
			<v-card  @click="hola()" class="" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons ml-1  mr-1 mr-sm-2">thumb_up</v-icon>
				<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Me gusta</span>
			</v-card>
			
			<v-card @click="hola()" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">comment</v-icon>
				<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Comentar</span>
			</v-card>
			
			<v-card @click="hola()" flat  width="100%">
				<v-icon color="#1e81b0" class="material-icons mr-1 mr-sm-2">edit</v-icon>
				<span v-if="$vuetify.breakpoint.width>=255" class="text-caption text-sm-subtitle-1">Editar</span>
			</v-card>
		</v-card>
	</v-card>
</template>

<script>
import moment from 'moment'
	
export default {
		name:'Show_Msg',

		props:{
			ancho:Number
		},
		data: function (){
			return {
			messages:'hoy vi que faltaba un pedazo de mi corazón, eras tú!!! sin tanto despecho dijo ella con su corazon de piedra y alma fria sin amor.',
			user: 'Fabiano Spaguetti',
			time: moment().format('h:mm a'),//Date.now()
			longmsg: "Lorem ipsum dolor sit amet consectetur adipiscing elit, aenean cubili a enim vulputate vehicula est facilisis, ac libero varius diam maecenas leo. Curabitur inceptos quis integer diam cras velit sollicitudin, fames a id ligula cursus torquent, sagittis habitasse eros cubilia in odio. Libero ridiculus facilisi mattis eu vehicula sodales cras dictum consequat mollis himenaeos, nec posuere commodo per hac feugiat scelerisque sollicitudin potenti id volutpat curabitur, enim curae eget montes maecenas nunc phasellus tellus suscipit luctus. Vestibulum habitant posuere condimentum dictumst nostra euismod primis, nisi mus cubilia aliquet mattis dignissim accumsan, vehicula non luctus cum tellus integerasdfasdfasdfasdfasdfasdfasdfasdfasfasdfasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafdadsfasdfdafsdfasdfasdfasdfsdfqweqwefqwefdfasdfasdfasdfqrewqwerqweqwefsadfasdfasdflkjdkjadklfjoiqfijdfkljasdkfjoiqweoijfl;kasjdfioqwefkljasdlfjioqwefksdfiqwelaksjdsf;ajfqejf;laksjdsfiaiofq,"
			}
		},
		
		methods:{
			hola(){
				alert("funciona el componente Show_Msg");
			}
		},

};
</script>

