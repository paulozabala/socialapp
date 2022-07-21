<template>
	<div>
		<!--My public msg box-->
		<v-card class="mt-6" width="500">
			<v-card flat  class="d-flex justify-center pa-2 pt-4 pb-0 " width="500" >
				<v-card :class="$vuetify.breakpoint.width<=360 ? 'mr-12' : 'mr-4'"  flat  width="15%">
					<v-avatar size="60">
						<v-img 
							src="../assets/avatar.jpeg"
						/>
					</v-avatar>
				</v-card>
				<v-card  flat  width="85%">
					<div>
						<v-text-field
							v-model="msg"
							@click="showDialog()"
							label="¿Quieres compartir algo?"
							outlined
							rounded
						></v-text-field>
					</div>
				</v-card>
			</v-card>
			<v-divider width="95%"></v-divider>
		
			<!--My  public msg box buttons-->
			<v-card flat  class="d-flex justify-center pa-2" width="500">
				<v-card flat  width="100%" >
					<v-icon color="#1e81b0" class="material-icons mr-2">add_photo_alternate
					</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Imagen</span>
				</v-card>
				<v-card  flat  width="100%">
					<v-icon class="mr-2">send</v-icon>
					<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Enviar</span>
				</v-card>
			</v-card>
		</v-card>
	
		<v-dialog
			v-model="dialog"
			width="500"
		>
			<v-card >
				<v-card-title class="d-flex justify-center">
					<span class="text-h5">¡Comparte tus historias con el mundo!</span>
				</v-card-title>
				<v-card-text>
					<v-textarea
						v-model="msg"
						counter
						label="¡Comparte tus emociones!"
						:rules="rules"
						:value="value"
					></v-textarea>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						small
						color="red darken-1"
						text
						@click="dialog = false"
					>
						No deseo escribir
					</v-btn>
					<v-btn
						small
						color="blue accent-4"
						text
						@click="dialog = false"
					>
						Terminé
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
	export default{
		name:'Create_Msg',

		data(){
			return{
				msg:'',
				dialog:false,
				rules: [v => v.length <= 300 || 'Max 300 caracteres'],
				value: 'Escribe tu historia aqui...',
			}
		},
			
		methods:{
			showDialog(){
				this.dialog=true;
			},

			send(){
				this.dialog=false;

			},
		},

};


</script>
