const path = require('path')
const config = require('config')
const logger = require('./logger')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const router = require('../routes')
const compress = require('koa-compress')
const views = require('./render')
const etag = require('koa-etag')
const proxy = require('koa-proxy')
const session = require('koa-session')
const passport = require('./passport')
const headers = require('./headers')
const res = require('./res')
const send = require('koa-send')

module.exports = (app) => {
  app.keys = ['zoei:session']
  app
    .use(logger())
    .use(headers())
    .use(async (ctx, next) => {
      ctx.docDir = path.resolve(__dirname, '../../public/docs')
      await next()
    })
    .use(async (ctx, next) => {
      let reqPath = ctx.path.replace(/^\//, '')
      if (reqPath.split('/')[0] === 'static') {
        await send(ctx, reqPath.replace(/^\//, ''), {
          maxage: 3600 * 24,
          root: path.resolve(__dirname, '../..')
        })
      } else {
        await next()
      }
    })
    .use(cors({
      'Access-Control-Allow-Origin': '*'
    }))
    .use(views({
      viewRoot: path.resolve(__dirname, '../views'),
      viewOptions: {
        map: {
          nunjucks: 'nunjucks',
          html: 'nunjucks'
        },
        extension: 'nj'
      }
    }))
    .use(bodyParser({
      extendTypes: {
        json: ['application/x-javascript']
      }
    }))
    .use(res({}, app))
    .use(session({
      key: 'zoei:sess'
    }, app))
    .use(passport.initialize())
    .use(passport.session())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(etag())
    .use(compress({
      filter: () => true,
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
}