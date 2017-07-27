const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const WechatStrategy = require('passport-wechat').Strategy
const debug = require('debug')('passport')
const User = require('../models/user.js')

passport.serializeUser(function(user = {}, done) {
  // console.log('serializeUser', user)
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  // console.log('deserializeUser', id)
  let user = await User.get({ _id: id })
  done(null, user)
})
 
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    // console.log('LocalStrategy', username, password)
    try {
      let user = await User.get({ username: username })
      if (!user) {
        done(null, false, { message: '用户不存在' })
      } else if (password !== user.password) {
        done(null, false, { message: '密码错误' })
      } else {
        done(null, user)
      }
    } catch (e) {
      done(e)
    }
}))

passport.use(new GitHubStrategy({
    clientID: '1596b198ed54ace9682c',
    clientSecret: '4e4718917a1a663ceeb83e39544a57fada0f0e14',
    callbackURL: "http://local.zoei.me/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, _json } = profile
    try {
      let user = await User.get({ githubId: id })
      if (!user) {
        user = await User.add({ githubId: id, ..._json })
      } else {
        await User.update({ githubId: id }, { githubId: id, ..._json })
      }
      done(null, user)
    } catch (e) {
      done(e)
    }
  }
))

// passport.use(new WechatStrategy({
//     appID: {APPID},
//     name:{默认为wechat,可以设置组件的名字}
//     appSecret: {APPSECRET},
//     client:{wechat|web},
//     callbackURL: {CALLBACKURL},
//     scope: {snsapi_userinfo|snsapi_base},
//     state:{STATE},
//     getToken: {getToken},
//     saveToken: {saveToken}
//   },
//   function(accessToken, refreshToken, profile,expires_in, done) {
//     return done(err,profile);
//   }
// ))
module.exports = passport