import { createApiActionTypes } from './actions'

export default {
  ...createApiActionTypes({
    SIGNIN: 'auth/SIGNIN',
    SIGNUP: 'auth/SIGNUP',
    SEND_SMS_CODE: 'auth/SEND_SMS_CODE'
  })
}