<template>

	<v-card color="grey">
		
		<!--Header's profile-->
		<v-card flat  color="grey" height="60%" >
			<v-card flat tile  width="90%">
				<v-card flat class="" >
					<v-img src="../assets/portadafb.png" max-height="300px"/>
				</v-card>
			</v-card>
			<v-card flat  rounded="lg t-0"  :class="$vuetify.breakpoint.width>=900 ? 'd-flex justify-start pl-4' : 'd-flex justify-center '" width="90%" height="70">
				<v-avatar :class="$vuetify.breakpoint.width>=900 ? 'avatarfixleft' : 'avatarfixmid'" :size="$vuetify.breakpoint.width<=230 ? '120' : '160'"  >
					<v-img src="../assets/avatar.jpeg"/>
				</v-avatar>
			</v-card>
		</v-card>

		<!--body-->
		<v-card :class="$vuetify.breakpoint.width<=885 ? 'd-flex align-center flex-column mt-4' : 'd-flex justify-center mt-4'  " flat color="grey" width="90%" >
			
			<!--Information card-->
			<v-card class="mb-4"
				:width="$vuetify.breakpoint.width<=885 ? '530' : ''"
				max-height="800"
			>
				<v-card-title>
					Información personal
				</v-card-title>

				<v-card-subtitle>
					{{'description'}}
				</v-card-subtitle>

				<v-card-text>
					{{name+' '+lastname}}
				</v-card-text>
		
				<v-card-text>
					<span>Cumpleaños:</span> {{'birthday'}}
				</v-card-text>

				<v-card-text>
					{{'Sexo: sex'}}
				</v-card-text>

				<!--card's actions & transitions-->
				<v-card-actions>
					<v-btn
						color="#1e81b0"
						text
					>
						Intereses
					</v-btn>
					<v-spacer></v-spacer>

					<v-btn
						icon
						@click="show = !show"
					>
						<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>
				
				<v-expand-transition>
					<div v-show="show">
						<v-divider width="90%"></v-divider>

						<v-card-text>
							{{'interests'}}
						</v-card-text>
					</div>
				</v-expand-transition>

				<v-card-actions>
					<v-btn
						color="#1e81b0"
						text
					>
						Buscando
					</v-btn>
					<v-spacer></v-spacer>

					<v-btn
						icon
						@click="busco = !busco"
					>
						<v-icon>{{ busco ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>

				<v-expand-transition>
					<div v-show="busco">
						<v-divider width="90%"></v-divider>

						<v-card-text>
							{{'lookingfor'}}
						</v-card-text>
					</div>
				</v-expand-transition>
			</v-card> <!--end of information card -->
			
		<v-card :class="$vuetify.breakpoint.width<=885 ? 'd-flex align-center flex-column pa-0': 'd-flex align-center flex-column pa-0 ml-4'" color="grey" flat  width="530">
				<v-card flat outlined tile class="mt-0" v-for="i in 4" :key="i" color="grey" width="530">
					<Show_Msg :ancho="530" />
				</v-card><v-spacer></v-spacer>
			</v-card>
		</v-card><!--body end--> 
	</v-card>

</template>

<script>
import Show_Msg from '../components/ShowMsg.vue'


export default{
	name:'Profile_Page',

	components:{
		Show_Msg,
	},


	data:function(){
		return{
			description:'',
			name:'',
			lastname:'',
			birthday:'',
			sex:'',
			interests:'',
			lookingfor:'',
			show:false,
			busco:false,
};
	},

};


</script>
