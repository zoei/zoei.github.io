import { createApiAction } from '../actions'
import { createApiMutations } from '../mutations'
import wanyuanService from '../../service/WanYuanService'
import types from '../mutation-types'
const {
  GET_USER
} = types

const state = {
  users: {}
}

// getters
const getters = {
}

// actions
const actions = {
  [GET_USER]: createApiAction(GET_USER, wanyuanService.getUser)
}

// mutations
const mutations = {
  ...createApiMutations([
    GET_USER
  ]),
  [GET_USER] (state, { params, payload }) {
    state.users[params.id] = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}