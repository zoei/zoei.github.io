import 'isomorphic-fetch'
const config = require('./config')
const middleware = require('./middlewares')
const Koa = require('koa')
const app = new Koa()

middleware(app)

app.listen(config.port, ()=>{
  console.info('==> 🚧  server listening on port %s', config.port)
})