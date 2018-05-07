import EventEmitter from 'eventemitter2'
import { getApiUrl } from './urls'
import fetch from '../core/fetch'
import Logger from '../core/logger'
const logger = new Logger('fetch')

export const COMMON_STATUS = {
  EXCEPTION: -9999	// 异常
}

export const HTTP_STATUS = {
  OK: 200,
  CLIENT_ERROR: 400,	// 客户端错误
  AUTHENTICATE: 401,	// 认证错误
  SERVER_ERROR: 500	// 服务器错误
}

const COMMON_ERROR_MESSAGE = '出错啦，请稍后再试'

export default class BaseApiService extends EventEmitter {

  MODULE = ''
  API_VERSION = ''

  /**
   * 获取接口地址
   *
   * @param api 接口名称
   * @param [args] 接口参数
   * @returns 接口地址
   */
  getApiUrl() {
    return getApiUrl.apply(this, [this.MODULE, this.API_VERSION, ...arguments])
  }


  /**
   * fetch api
   *
   * @param api 接口名称
   * @param params URL参数
   * @param config (description)
   * @returns (description)
   */
  fetchApi(api, params, config = {}) {
    config.headers = {
      ...config.headers
    }

    return fetch(this.getApiUrl(api, params), config)
  }

  /**
   * (description)
   *
   * @param api (description)
   * @param args (description)
   * @param config (description)
   * @returns (description)
   */
  async fetch(api, args, config, apiCfg) {
    try {
      let res = await this.fetchApi(api, args, config)
      let status = res.status

      if (status !== HTTP_STATUS.OK) {
        if (!navigator.onLine) {
          return Promise.reject({ code: status, success: false, message: '网络无法连接' })
        }
        return Promise.reject({ code: status, success: false, message: res.statusText })
      }

      let contentType = res.headers.get('Content-Type')
      let payload
      if (contentType.indexOf('application/json') !== -1) {
        payload = await res.json()
        payload = payload || { code: COMMON_STATUS.RESPONSE_IS_EMPTY, success: false, message: COMMON_ERROR_MESSAGE }
      } else if (contentType.indexOf('text') !== -1) {
        payload = await res.text()
        if (payload) {
          payload = { code: 0, success: true, data: payload }
        } else {
          payload = { code: COMMON_STATUS.RESPONSE_IS_EMPTY, success: false, message: COMMON_ERROR_MESSAGE }
        }
      }

      if (payload.code !== 0) {
        return Promise.reject(payload)
      }
      return Promise.resolve(payload)
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e)
      }
      return Promise.reject({ code: COMMON_STATUS.EXCEPTION, success: false, message: e.message })
      logger.error(e)
    }
  }
}

/**
 * getInstance的工厂方法
 *
 * 返回的方法参数version是类似'1.1'的版本号，方法返回类{baseClassName}V1_1的实例
 *
 * @export
 * @param {any} module
 * @param {any} baseClassName
 * @returns
 */
export function instanceFactory(module, baseClassName) {
  let instances = {}

  return (version = '1') => {
    if (!instances[version]) {
      if (version === '1') {
        instances[version] = new (module.exports[baseClassName + 'V1'] || module.exports[baseClassName])()
      } else {
        instances[version] = new module.exports[baseClassName + 'V' + version.replace('.', '_')]()
      }
    }
    return instances[version]
  }
}