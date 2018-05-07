import { createApiAction } from '../actions'
import { createApiMutations } from '../mutations'
import docService from '../../service/DocService'
import types from '../mutation-types'
const {
  CREATE_DOC,
  UPDATE_DOC,
  DELETE_DOC,
  GET_DOCS,
  GET_DOC
} = types

const state = {
  docs: {}
}

// getters
const getters = {
}

// actions
const actions = {
  createDoc: createApiAction(CREATE_DOC, docService.create),
  updateDoc: createApiAction(UPDATE_DOC, docService.update),
  deleteDoc: createApiAction(DELETE_DOC, docService.delete),
  getDocs: createApiAction(GET_DOCS, docService.getList),
  getDoc: createApiAction(GET_DOC, docService.get),
}

// mutations
const mutations = {
  ...createApiMutations([
    CREATE_DOC,
    UPDATE_DOC,
    DELETE_DOC,
    GET_DOCS,
    GET_DOC
  ]),
  [CREATE_DOC] (state, { params, payload }) {
    console.log('save doc', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}