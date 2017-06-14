import { createApiAction } from '../actions'
import { createApiMutations } from '../mutations'
import wanyuanService from '../../service/WanYuanService'
import types from '../mutation-types'
const {
  SIGNUP,
  SIGNIN,
  SEND_SMS_CODE
} = types

const state = {
  smsCode: null,
  authentic: document.cookie.indexOf('sid=') !== -1
}

// getters
const getters = {
}
function clearCookie() { 
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
  if (keys) { 
  for (var i = keys.length; i--;) 
  document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
  } 
}

// actions
const actions = {
  signin: async ({ commit, state }, params) => wanyuanService.signin(params),
  signup: async ({ commit, state }, params) => wanyuanService.signup(params),
  logout: () => {
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
    for (var i = keys.length; i--;) 
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
    }
  },
  sendSMSCode: async ({ commit, state }, params) => wanyuanService.sendSMSCode(params),
  saveRegisterInfo: async ({ commit, state }, params) => wanyuanService.saveRegisterInfo(params),
  changepassword: async ({ commit, state }, params) => wanyuanService.changepassword(params),
  getNews: async ({ commit, state }, params) => wanyuanService.getNews(params),
  getBanner: async ({ commit, state }, params) => wanyuanService.getBanner(params),
  getUserInfo: async ({ commit, state }, params) => wanyuanService.getUserInfo(params),
  getUserVideos: async ({ commit, state }, params) => wanyuanService.getUserVideos(params),
  getVideos: async ({ commit, state }, params) => wanyuanService.getVideos(params),
  getMovies: async ({ commit, state }, params) => wanyuanService.getMovies(params)
  // signup: createApiAction(SIGNUP, wanyuanService.signup),
  // signin: createApiAction(SIGNIN, wanyuanService.signin),
  // sendSMSCode: createApiAction(SEND_SMS_CODE, wanyuanService.sendSMSCode)
}

// mutations
const mutations = {
  ...createApiMutations([
    // SIGNUP,
    // SIGNIN,
    SEND_SMS_CODE
  ]),
  [SEND_SMS_CODE] (state, { params, payload }) {
    state.smsCode = payload.message
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}