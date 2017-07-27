const transMapping = require('./lib/parser').transMapping
const router = require('koa-router')()
const passport = require('koa-passport')

let authenticate = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.sendJSON({
      code: 401,
      success: false,
      message: '没有权限'
    })
  }
}

// authenticate = passport.authenticate('local', { session: false })

module.exports = transMapping(router, {
  'put /doc': [authenticate, 'api/doc::update'],
  'post /doc': [authenticate, 'api/doc::create'],
  'delete /doc/:id': [authenticate, 'api/doc::delete'],
  'get /doc': 'api/doc::getList',
  'get /doc/:id': 'api/doc::get',
  'post /user/signin': 'api/user::signin',
  'post /user/signup': 'api/user::signup',
  'post /user/signout': 'api/user::signout',
  'get /auth': 'api/user::auth'
})