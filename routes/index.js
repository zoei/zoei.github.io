const transMapping = require('./lib/parser').transMapping
const router = require('koa-router')()

module.exports = transMapping(router, {
  '/': 'home',
  '/*': 'home',
})