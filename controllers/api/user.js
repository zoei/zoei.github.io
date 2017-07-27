const passport = require('koa-passport')
const User = require('../../models/user')

module.exports = {
  signin: async ctx => {
    try {
      await passport.authenticate('local', function(err, user, info, status) {
        if (user === false) {
          ctx.body = { code: 401, success: false, message: info.message }
          // ctx.throw(401)
        } else {
          const { password, _id, ...others } = user
          ctx.body = { code: 0, success: true, data: others }
          return ctx.login(user)
        }
      })(ctx)
    } catch (e) {
      console.log('signin err', e)
    }
  },
  signup: async ctx => {
    try {
      const { username, password, email, phoneNo } = ctx.request.body
      let user = await User.add({ username, password, email, phoneNo })
      ctx.sendJSON({ code: 0, success: true, data: user })
    } catch (e) {
      console.log('signup err', e)
      ctx.sendJSON({ code: -1003, success: false, message: e.message })
    }
  },
  signout: async ctx => {
    ctx.logout()
    ctx.sendJSON({ code: 0, success: true })
  },
  logout: async ctx => {
    ctx.logout()
    ctx.redirect('/')
  },
  checkAuth: async ctx => {
    if(ctx.isAuthenticated()) {
      ctx.redirect(ctx.query.url)
    } else {
      ctx.redirect('/signin?url=' + ctx.query.url)
    }
  },
  auth: async ctx => {
    if(ctx.isAuthenticated()) {
      ctx.sendJSON({ code: 0, success: true, data: ctx.state.user })
    } else {
      ctx.sendJSON({ code: 401, success: false, message: '用户未登录' })
    }
  }
}