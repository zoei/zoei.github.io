require('isomorphic-fetch')
const mongoose = require('mongoose')
mongoose.Promise = Promise
const config = require('config')
const applyMiddlewares = require('./middlewares')
const Koa = require('koa')
const app = new Koa()

applyMiddlewares(app)

app.on('error', (err)=>{
  console.log(err)
})

app.listen(config.port, ()=>{
  console.info('==> 🚧  server listening on port %s', config.port)
})