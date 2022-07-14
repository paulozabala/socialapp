import Vue from 'vue'
import VueRouter from 'vue-router'
import Home_View from '../views/HomeView.vue'
import Profile_View from '../views/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home_View
	},

	{
		path: '/:id',
		name: 'perfil',
		component: Profile_View
	},

	{
		path: '/login-reg',
		name: 'Login_Reg',
		component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
