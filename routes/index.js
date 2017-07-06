const transMapping = require('./lib/parser').transMapping
const router = require('koa-router')()

module.exports = transMapping(router, {
  '/api': require('./api'),
  '/': 'home',
  '/*': 'home',
})