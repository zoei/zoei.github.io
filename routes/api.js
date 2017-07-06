const transMapping = require('./lib/parser').transMapping
const router = require('koa-router')()

module.exports = transMapping(router, {
  'put /doc': 'api/doc::update',
  'post /doc': 'api/doc::create',
  'delete /doc/:id': 'api/doc::delete',
  'get /doc': 'api/doc::getList',
  'get /doc/:id': 'api/doc::get'
})