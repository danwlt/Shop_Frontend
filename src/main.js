import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/style.css'
import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faCircleUser , faTrash, faPenToSquare, faSignOut, faMagnifyingGlass, faBinoculars, faBasketShopping, faPlus, faCartShopping, faX, faPen, faCheck} from '@fortawesome/free-solid-svg-icons'


library.add(faUser, faCircleUser, faTrash, faPenToSquare, faSignOut, faMagnifyingGlass, faBinoculars, faBasketShopping, faPlus, faCartShopping, faX, faPen, faCheck)


createApp(App).use(router).use(VueCookies).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

