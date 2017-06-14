import format from 'string-template'

var configure = {}

if (process.env.NODE_ENV === 'development') {
  configure.global = require('./url.config.development.json')
} else {
  configure.global = require('./url.config.production.json')
}

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
    return window.location.origin
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
  if (!configure[module]) configure[module] = require(`./url.config.${module}.json`)

  const config = configure[module][version]
  const resfulUrl = config[api]
  return format((getHost() + '/' + module + resfulUrl), params)
}

export function getUrl(api) {
  return configure.global[api]
}