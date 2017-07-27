import { createApiActionTypes } from './actions'

export default {
  ...createApiActionTypes({
    CREATE_DOC: 'doc/CREATE_DOC',
    UPDATE_DOC: 'doc/UPDATE_DOC',
    DELETE_DOC: 'doc/DELETE_DOC',
    GET_DOCS: 'doc/GET_DOCS',
    GET_DOC: 'doc/GET_DOC',
    SIGNIN: 'user/SIGNIN',
    SIGNUP: 'user/SIGNUP',
    AUTH: 'global/AUTH'
  })
}