import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'
import RecentItemsView from '../views/RecentItemsView.vue'
import RegisterView from '../views/RegisterView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue')
  },
  {
    path: '/lists',
    name: 'lists',
    component: ShoppingListView
  },
  {
    path: '/list/:id',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '../views/ListDetailView.vue')
  },
  {
    path: '/recent',
    name: 'recent',
    component: RecentItemsView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: () => window.location.href = 'http://localhost:8081/error',
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
