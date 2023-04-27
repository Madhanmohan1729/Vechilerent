// Composables
import { createRouter, createWebHistory } from 'vue-router'
import loginForm from '../components/loginForm.vue'
import signUp from '../components/signUp.vue'
import vechiclePage from '../components/vehiclePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'loginForm' }
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/login',
      name: 'loginForm',
      component: loginForm
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: vechiclePage
    }




  ]
})

export default router

