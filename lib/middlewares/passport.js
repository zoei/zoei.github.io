const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const WechatStrategy = require('passport-wechat').Strategy
const debug = require('debug')('passport')
const User = require('../models/user.js')
const config = require('config').get('account.zoeicc')

passport.serializeUser(function(user = {}, done) {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  let user = await User.get({ _id: id })
  done(null, user)
})
 
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    let user = await User.get({ username: username })
    if (!user) {
      done(null, false, { message: '用户不存在或密码错误' })
    } else if (password !== user.password) {
      done(null, false, { message: '用户不存在或密码错误' })
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
  callbackURL: "http://zoei.me/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const { id, _json } = profile
  try {
    let user = await User.get({ githubId: id })
    if (!user) {
      user = await User.add({ githubId: id, ..._json })
    } else {
      user = { githubId: id, ..._json }
      await User.update({ githubId: id }, user )
    }
    done(null, user)
  } catch (e) {
    done(e)
  }
}))

passport.use(new GitHubStrategy({
  clientID: '2101c657616f2d1b19c7',
  clientSecret: 'ad1371c157569cbbec0acc2b5ab021a9aba30181',
  callbackURL: "http://zoei.cc/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const { id, _json } = profile
  try {
    console.log('github', id, _json)
    let user = await User.get({ githubId: id })
    if (!user) {
      user = await User.add({ githubId: id, ..._json })
    } else {
      user = { githubId: id, ..._json }
      await User.update({ githubId: id }, user )
    }
    done(null, user)
  } catch (e) {
    done(e)
  }
}))

// passport.use(new WechatStrategy({
//     appID: config.appid,
//     name: 'wechat',
//     appSecret: config.appsecret,
//     client: 'wechat', // wechat|web,
//     callbackURL: 'http://zoei.cc/wechat/callback',
//     scope: 'snsapi_userinfo' // {snsapi_userinfo|snsapi_base},
//     state: // {STATE},
//     getToken: async () => {
//       let data = await wechatDB.findOne({ config.appid, key: 'access_token' })
//       return data || {}
//     },
//     saveToken: async (token)=>{
//       wechatDB.update({ appid, key: 'access_token' }, { $set: token }, { upsert: true })
//     }
//   },
//   function(accessToken, refreshToken, profile,expires_in, done) {
//     console.log('passport-wechat', err, profile)
//     return done(err, profile);
//   }
// ))

module.exports = passport