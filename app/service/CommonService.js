import BaseApiService, { instanceFactory } from './BaseApiService'
/**
 * 认证相关的服务
 *
 * @export
 * @class CommonService
 * @extends {BaseApiService}
 */
export class CommonService extends BaseApiService {

  MODULE = ''
  API_VERSION = 'v1'

  auth = ({}) => {
    return this.fetch('Auth', {})
  }
}

export default new CommonService()