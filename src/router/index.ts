import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Favourites from '../pages/Favourites.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favourites', name: 'Favourites', component: Favourites },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
