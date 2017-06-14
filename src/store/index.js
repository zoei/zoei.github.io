import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './actions'
import * as getters from './getters'
import wanyuan from './modules/wanyuan'
import createLogger from './plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    wanyuan
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})