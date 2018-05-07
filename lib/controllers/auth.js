const passport = require('koa-passport')

module.exports = {
  checkAuth: async ctx => {
    if(ctx.isAuthenticated()) {
      ctx.redirect(ctx.query.url || '/')
    } else {
      ctx.redirect('/login' + (ctx.query.url ? ('?url=' + ctx.query.url) : ''))
    }
  },
  login: async ctx => {
    try {
      await passport.authenticate('local', async function(err, user, info, status) {
        if (user === false) {
          ctx.throw(401)
        } else {
          const { password, _id, ...others } = user
          await ctx.login(user)
          ctx.redirect(ctx.query.url || '/')
        }
      })(ctx)
    } catch (e) {
      console.log('login err', e)
    }
  },
  logout: async ctx => {
    ctx.logout()
    ctx.redirect('/')
  },
}