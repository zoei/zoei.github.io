import format from 'string-template'

var configure = {}

configure.global = require('./url.config.json')

/**
 * (description)
 *
 * @export
 * @param url (description)
 * @returns (description)
 */
export function getHost() {
  if (process.env.HOST) return '//' + process.env.HOST

  if (process.env.NODE_ENV === 'development') {
    // return '//localhost:3020'
    return location.origin
  }
}

/**
 * 获取API URL
 *
 * @export
 * @param module (description)
 * @param {string} [version='v1'] (description)
 * @param api (description)
 * @param params (description)
 * @returns (description)
 */
export function getApiUrl(module, version = 'v1', api, params) {
  let config
  let resfulUrl
  if (!module) {
    config = configure['global'][version]
    resfulUrl = config[api]
    return format((getHost() + '/api/' + resfulUrl), params)
  }
  if (!configure[module]) configure[module] = require(`./url.config.${module}.json`)
  config = configure[module][version]
  resfulUrl = config[api]
  return format((getHost() + '/api/' + module + resfulUrl), params)
}

export function getUrl(api) {
  return configure.global[api]
}