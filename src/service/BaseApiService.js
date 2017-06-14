import EventEmitter from 'eventemitter2'
import { getApiUrl } from './urls'
import fetch from '../core/fetch'
import Logger from '../core/logger'
const logger = new Logger('fetch')

export const COMMON_STATUS = {
  ACCESS_FORBID: 300000,	// 禁止访问
  GENERAL: -40000,	// 一般请求错误
  PARAMETER: -40001,	// 参数格式错误
  DATA_NOT_FOUND: -40402,	// 所请求数据不存在
  AUTHENTICATE: -40100,	// 认证错误
  SENSITIVE_WORDS: -40200,	// 敏感词错误
  RESOURCE_NOT_FOUND: -40400,	// 资源不存在
  SERVER_CONFIG: -50001,	// 服务器配置错误

  RESPONSE_IS_EMPTY: -9001,	// 响应为空
  CLIENT_ERROR: -9002,	// 认证错误
  SERVER_ERROR: -9003,	// 服务器错误
  EXCEPTION: -9999	// 异常
}

export const HTTP_STATUS = {
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
      let httpStatus = res.status

      if (httpStatus === HTTP_STATUS.AUTHENTICATE) {
        return Promise.reject({ status: COMMON_STATUS.AUTHENTICATE, data: null, message: '认证错误' })
      } else if (httpStatus === HTTP_STATUS.CLIENT_ERROR) {
        return Promise.reject({ status: COMMON_STATUS.CLIENT_ERROR, data: null, message: COMMON_ERROR_MESSAGE })
      } else if (httpStatus === HTTP_STATUS.SERVER_ERROR) {
        return Promise.reject({ status: COMMON_STATUS.SERVER_ERROR, data: null, message: COMMON_ERROR_MESSAGE })
      } else if (httpStatus !== 200) {
        if (!navigator.onLine) {
          return Promise.reject({ status, data: null, message: '网络无法连接' })
        }
        return Promise.reject({ status, data: null, message: COMMON_ERROR_MESSAGE })
      }

      res = await res.json()
      let { status, message, code, msg, success, ...others } = res
      if (code !== undefined) {
        status = (typeof success !== 'undefined' && success) || status == '200' ? 0 : parseInt(code)
        message = msg
      }
      res = res || { status: COMMON_STATUS.RESPONSE_IS_EMPTY, message: COMMON_ERROR_MESSAGE }

      if (status !== 0) {
        return Promise.reject({ status, message, ...others })
      }

      return Promise.resolve({ message, ...others })
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e)
      }
      return Promise.reject({ status: COMMON_STATUS.EXCEPTION, message: e.message })
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