const path = require('path')
const Router = require('koa-router')

function getController(str) {
  let [dir, handler] = str.split('::')
  let controller = require(path.resolve(__dirname, '../../controllers/' + dir))
  return (method) => controller[handler || method] || controller.get
}

function getType(to) {
  let type
  if (Array.isArray(to)) {
    type = 'handlers'
  } else if (typeof to === 'function') {
    type = 'function'
  } else if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('/'))) {
    type = 'redirect'
  } else if (typeof to === 'string') {
    type = 'controller'
  }
  return type
}

function configRouter(router, middleware, { type, method, url, to }) {
  switch (type) {
    case 'sub_route_config':
      router.use(url, to.routes(), to.allowedMethods())
      break
    case 'handlers':
      let args = [url].concat(to.map(({ type: t, handler }) => {
        if (t === 'function') {
          return handler
        } else if (t === 'controller') {
          return handler(method)
        }
        return null
      }))
      router[method].apply(router, args)
      break
    case 'function':
      middleware ? router[method](url, middleware, to) : router[method](url, to)
      break
    case 'redirect':
      router[method](url, (ctx)=>ctx.response.redirect(to))
      break
    case 'controller':
      middleware ? router[method](url, middleware, to(method)) : router[method](url, to(method))
      break
    default:
  }
}

module.exports.transMapping = function transMapping(router, middleware, mapping) {
  if (arguments.length === 2) {
    mapping = middleware
    middleware = null
  }
  Reflect.ownKeys(mapping).forEach(route => {
    let [methods, url] = route.split(' ')
    if (!url) {
      url = methods
      methods = 'get'
    }

    let routeConfig = mapping[route]
    let configType = null
    let to = routeConfig

    if (typeof routeConfig === 'object' && routeConfig instanceof Router) {
      configType = 'sub_route_config'
    } else if (Array.isArray(routeConfig)) {
      configType = 'handlers'
      to = routeConfig.map(config => {
        let t = getType(config)
        if (t === 'function') {
          return {
            type: 'function',
            handler: config
          }
        } else if (t === 'controller') {
          return {
            type: t,
            handler: getController(config)
          }
        }
        return null
      })
    } else if (typeof routeConfig === 'object') {
      to = routeConfig.to
    }

    if (!configType) {
      configType = getType(to)
      if (configType === 'controller') {
        to = getController(to)
      }
    }

    methods.split('|').forEach(method=>{
      if (configType === 'sub_route_config') {
        router.use(url, routeConfig.routes(), routeConfig.allowedMethods())
        return
      }
      configRouter(router, middleware, { type: configType, method, url, to })
    })
  })

  return router
}