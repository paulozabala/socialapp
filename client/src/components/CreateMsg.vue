<template>
	<!--My public msg box-->
	<v-card class="mt-8" width="500">
		<v-card flat  tile  class="d-flex justify-center pa-2 pt-4 pb-0 " width="500" >
			<v-card :class="$vuetify.breakpoint.width<=360 ? 'mr-12' : 'mr-4'"  flat  width="15%">
				<v-avatar size="60">
					<v-img 
						src="../assets/avatar.jpeg"
					/>
				</v-avatar>
			</v-card>
			<v-card @click="hola()" flat  width="85%">
			<div>
				<v-text-field
					label="¿Quieres compartir algo?"
					outlined
					rounded
				></v-text-field>
			</div>
			</v-card>
		</v-card>
		<v-divider width="95%"></v-divider>
		<!--My  public msg box buttons-->
		<v-card flat  tile  class="d-flex justify-center pa-2" width="500">
			<v-card flat  width="100%" >
				<v-icon color="#1e81b0" class="material-icons mr-2">add_photo_alternate
				</v-icon>
				<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Foto</span>
			</v-card>
			<v-card  flat  width="100%">
				<v-icon class="mr-2">send</v-icon>
				<span v-if="$vuetify.breakpoint.width>=265" class="text-caption text-sm-subtitle-1">Enviar</span>
			</v-card>
		</v-card>
	</v-card>
</template>
<script>
	export default{
		name:'Create_Msg',
		methods:{
			hola(){
				alert("funciona componente Create_Msg");
			}
},

};


</script>
