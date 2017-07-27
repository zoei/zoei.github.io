import 'isomorphic-fetch'
import Logger from './logger'
const logger = new Logger('fetch')
const MAX_WAITING_TIME = 30000

function transformBody(params) {
  let str = []
  for(let p in params)
  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]))
  return str.join("&")
}

/**
 * (description)
 *
 * @returns (description)
 */
export function getWrappedPromise() {
  let wrappedPromise = {}
  let promise = new Promise((resolve, reject) => {
    wrappedPromise.resolve = resolve
    wrappedPromise.reject = reject
  })
  wrappedPromise.then = promise.then.bind(promise)
  wrappedPromise.catch = promise.catch.bind(promise)
  wrappedPromise.promise = promise // e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods
  return wrappedPromise
}

export default function getWrappedFetch(url, config) {
  let { method, body, headers, credentials, timestamp } = config

  let wrappedPromise = getWrappedPromise()

  let timeoutId = setTimeout(() => {
    wrappedPromise.reject(new Error('fetch timeout' + ' ' + url)) // reject on timeout
  }, MAX_WAITING_TIME)

  method = method ? method : config.body ? 'POST' : 'GET'
  let contentType = headers['Content-Type'] ? headers['Content-Type'] : 'application/json; charset=utf-8'
  body = method === 'POST' || method === 'PUT' ? contentType === 'application/x-www-form-urlencoded' ? transformBody(body) : contentType === 'application/json; charset=utf-8' ? JSON.stringify(body) : body : body

  config = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      ...headers
    },
    credentials: credentials || 'include',
    body
  }

  fetch(url, config)
    .then((response) => {
      clearTimeout(timeoutId)
      wrappedPromise.resolve(response)
    }).catch((error) => {
      clearTimeout(timeoutId)

      if (!navigator.onLine) {
        error.message = '网络无法连接'
      }
      logger.error(error)
      wrappedPromise.reject(error)
    })
  return wrappedPromise
}
