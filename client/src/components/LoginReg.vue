<template>
	<v-container>
		<v-row class="text-center pa-8" >
			<v-col  md="6" sm="5" xs="12" align='center' >
				<v-img
					src="../assets/community.svg" 
					alt="community"
					contain
					width="600px"
					height="400px"
				/>  <!--contain   causes picture not to be cropped -->
			</v-col>
			
			<v-col  md="5" sm="6" xs="12" class="pa-10" offset="1" offset-xl="0" >
				<span class="text-h4 text-sm-h4 font-weight-black">Login</span>
				<form class="">
					<v-text-field
						v-model="userName"
						:error-messages="nameErrors"
						:counter="10"
						label="Nombre de usuario"
						required
						@input="$v.userName.$touch()"
						@blur="$v.userName.$touch()"
					></v-text-field>	
					<v-text-field
						type="password"
						v-model="password"
						:error-messages="passErrors"
						label="Password"
						required
						@input="$v.password.$touch()"
						@blur="$v.password.$touch()"
					></v-text-field>
					<v-btn
						class="mt-4"
						@click="submit"
					>
						Ingresar
					</v-btn>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
//import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
	name: 'LoginReg',
	
	mixins: [validationMixin],

	validations: {
		userName: { required, maxLength: maxLength(8) },
		password: { required, maxLength: maxLength(8) },
/*		email: { required, email },
		select: { required },
		checkbox: {
			checked (val) {
			return val
			},
		},*/
		},

	data: () => ({

		userName: '',
		password:'',
		email: '',
		select: null,
		sexo: [
			'Hombre',
			'Mujer',
			'Prefiero  No  Decirlo',
		],
		checkbox: false,
	}),

	computed: {
/*		checkboxErrors () {
			const errors = []
			if (!this.$v.checkbox.$dirty) return errors
			!this.$v.checkbox.checked && errors.push('You must agree to continue!')
			return errors
		},
		selectErrors () {
			const errors = []
			if (!this.$v.select.$dirty) return errors
			!this.$v.select.required && errors.push('Sexo es requerido.')
			return errors
		},*/
		nameErrors () {
			const errors = []
			if (!this.$v.userName.$dirty) return errors
			!this.$v.userName.maxLength && errors.push('Nombre  debe tener como maximot 8 caracteres')
			!this.$v.userName.required && errors.push('userName es requerido.')
			return errors
		},
		passErrors () {
			const errors = []
			if (!this.$v.password.$dirty) return errors
			!this.$v.password.required && errors.push('Password es requerido.')
			return errors
		},
//		emailErrors () {
//			const errors = []
//			if (!this.$v.email.$dirty) return errors
//			!this.$v.email.email && errors.push('Must be valid e-mail')
//			!this.$v.email.required && errors.push('E-mail is required')
//			return errors
//		},
	},

	methods: {
		submit () {
			this.$v.$touch()
			
			},
		clear () {
			this.$v.$reset()
			this.userName = ''
			this.password = ''
/*			this.email = ''
			this.select = null
			this.checkbox = false*/
		},
	},
}

////////////////////////////////
</script>
