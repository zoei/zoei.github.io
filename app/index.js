import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Meta from 'vue-meta'

import App from './App.vue'
import Home from './pages/Home.vue'
import Upload from './pages/Upload.vue'
import Cos from './pages/Cos.vue'

import './styles/app.styl'

const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: Upload },
  { path: '/cos', component: Cos }
]

Vue.use(VueRouter)
Vue.use(Meta)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render(h) { return h(App) }
})