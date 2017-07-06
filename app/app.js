import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Meta from 'vue-meta'

import App from './App.vue'
import Home from './pages/Home.vue'
import Upload from './pages/Upload.vue'
import Cos from './pages/Cos.vue'
import Live from './pages/Live.vue'
import NewDoc from './pages/NewDoc.vue'
import ModifyDoc from './pages/ModifyDoc.vue'
import DocPreview from './pages/DocPreview.vue'
import DocList from './pages/DocList.vue'

import './styles/app.styl'

const routes = [
  { path: '/', component: Home },
  { path: '/upload/:id', component: Upload },
  { path: '/cos', component: Cos },
  { path: '/live/:id', component: Live },
  { path: '/doc/new', component: NewDoc },
  { path: '/doc/:id/modify', component: ModifyDoc },
  { path: '/doc/:id', component: DocPreview },
  { path: '/doc', component: DocList }
]

Vue.use(VueRouter)
Vue.use(Meta)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export function createApp () {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, store, router }
}