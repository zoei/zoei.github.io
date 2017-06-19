import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Meta from 'vue-meta'
import {
  Button,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Spinner,
  InfiniteScroll,
  Swipe,
  SwipeItem,
  Toast,
  MessageBox,
  Indicator
} from 'mint-ui'

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

Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Spinner.name, Spinner)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Toast.name, Toast)
// Vue.component(Indicator.name, Indicator)
Vue.use(Indicator)
Vue.use(InfiniteScroll)
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