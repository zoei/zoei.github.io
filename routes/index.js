const transMapping = require('./lib/parser').transMapping
const router = require('koa-router')()
const passport = require('koa-passport')

module.exports = transMapping(router, {
  '/api': require('./api'),
  'get /logout': 'api/user::logout',
  'get /auth': 'api/user::checkAuth',
  'get /auth/github': 'auth::github',
  'get /auth/github/callback': [passport.authenticate('github'), 'auth::githubCallback'],
  '/': 'home',
  '/*': 'home'
})