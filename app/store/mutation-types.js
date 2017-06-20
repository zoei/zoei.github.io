import { createApiActionTypes } from './actions'

export default {
  ...createApiActionTypes({
    GET_USER: 'auth/GET_USER'
  })
}