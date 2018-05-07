import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './actions'
import { mutations } from './mutations'
import * as getters from './getters'
import doc from './modules/doc'
import user from './modules/user'
import createLogger from './plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    authentic: false,
    authUserInfo: {}
  },
  actions,
  getters,
  mutations,
  modules: {
    doc,
    user
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})