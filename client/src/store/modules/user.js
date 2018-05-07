import { createApiAction } from '../actions'
import { createApiMutations } from '../mutations'
import userService from '../../service/UserService'
import types from '../mutation-types'
const {
  SIGNIN,
  SIGNUP
} = types

const state = {
  users: {}
}

// getters
const getters = {
}

// actions
const actions = {
  signin: createApiAction(SIGNIN, userService.signin),
  signup: createApiAction(SIGNUP, userService.signup)
}

// mutations
const mutations = {
  ...createApiMutations([
    SIGNIN,
    SIGNUP
  ])
}

export default {
  state,
  getters,
  actions,
  mutations
}