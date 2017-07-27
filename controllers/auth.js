const passport = require('koa-passport')

module.exports = {
  githubCallback: async ctx => {
    ctx.redirect('/doc')
  },
  github: passport.authenticate('github', { scope: ['user:email'] })
}