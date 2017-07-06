const path = require('path')
const config = require('../config')
const log = require('./log')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const router = require('../routes')
const compress = require('koa-compress')
const vue = require('./renderVue')
const sendJSON = require('./json')
const etag = require('koa-etag')
const proxy = require('koa-proxy')
const views = require('./render')

module.exports = (app) => {
  app
    .use(async (ctx, next) => {
      ctx.docDir = path.resolve(__dirname, '../static/docs')
      await next()
    })
    .use(log())
    .use(cors({
      // allowMethods: 'GET, POST, PUT, DELETE, OPTIONS',
      // origin: '*'
    }))
    .use(sendJSON())
    .use(views({
      viewRoot: path.resolve('views')
    }))
    .use(vue(path.resolve(__dirname, '../views'), {
      appBundle: path.resolve('static/vue-ssr-server-bundle.json'),
      clientManifest: path.resolve('static/vue-ssr-client-manifest.json')
    }))
    .use(bodyParser({
      extendTypes: {
        json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
      }
    }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(etag())
    .use(compress({
      filter: () => true,
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
}