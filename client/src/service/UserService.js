import BaseApiService, { instanceFactory } from './BaseApiService'
/**
 * 认证相关的服务
 *
 * @export
 * @class UserService
 * @extends {BaseApiService}
 */
export class UserService extends BaseApiService {

  MODULE = 'user';
  API_VERSION = 'v1';

  signin = ({ username, password }) => {
    return this.fetch('Signin', {}, { method: 'POST', body: { username, password } })
  }
  signup = ({ username, password }) => {
    return this.fetch('Signup', {}, { method: 'POST', body: { username, password } })
  }
}

export default new UserService()
