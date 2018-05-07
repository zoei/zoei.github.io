import types from './mutation-types'

const {
  AUTH
} = types

// mutations
export const mutations = {
  ...createApiMutations([
    AUTH
  ]),
  [AUTH](state, { params, payload }) {
    if (payload.success && payload.data) {
      state.authentic = true
      state.authUserInfo = payload.data
    } else {
      state.authentic = false
    }
  }
}

export function createApiMutations(types) {
  let mutationMap = {}
  types.forEach(type=>{
    mutationMap[type + '_request'] = function (state, data) {}
    mutationMap[type] = function (state, data) {}
    mutationMap[type + '_failure'] = function (state, data) {}
  })
  return mutationMap
}