const axios = require('axios')

// API REST 转换
const resolveUrl = (api, params) => {

  if (!api) {
    throw new Error('api must be required！')
  }

  let restReg = /\{([^\}])+\}/ig

  // api处理
  api = api.replace(restReg, matchkey => {
    let keyName = matchkey.slice(1, matchkey.length - 1);
    if (params.hasOwnProperty(keyName)) {
      let tmplValue = params[keyName]
      delete params[keyName]
      return tmplValue
    }
    return matchkey
  })
  // check 是否还有参数未转化
  if (restReg.test(api)) {
    throw `${api.match(restReg).join(',')}参数必填`
  }
  return {
    api,
    params
  }
}

function resolveRequest(config) {
  if (typeof config === 'string') {
    config = Object.assign({
      url: config
    }, arguments[1]);
  }
  config = Object.assign({ method: 'get' }, config)
  config.method = config.method.toLowerCase()

  const { url, method, data, ...others } = config
  const { api, params } = resolveUrl(url, data)

  let ret = {
    url: api,
    method,
    [method === 'get' ? 'params' : 'data']: Object.assign({}, params),
    ...others
  }
  return ret
}

const fetch = async (...args) => {
  try {
    let res = await axios(resolveRequest(...args))
    return res.data
  } catch (err) {
    return err
  }
}

const GET = request('get');
const POST = request('post');
const PUT = request('put');
const DELETE = request('delete');

module.exports = {
  resolveUrl,
  resolveRequest,
  fetch
}