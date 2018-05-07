const path = require('path')
const ConfigRouter = require('koa-router-config').ConfigRouter
const configRouter = new ConfigRouter()
const passport = require('../middlewares/passport')
const DEV = process.env.NODE_ENV === 'development'

configRouter.config(
  { controllerRoot: path.resolve(__dirname, '../controllers') },
  {
    // '/qc/costoken': 'qcloud.token',
    // '/qc/api': 'qcloud.request',
  
    // '/auth': 'auth.checkAuth',
    // 'get|post /auth/local': [passport.authenticate('local', { successFlash: 'Welcome!' }), ctx => ctx.body = ''],
    // '/auth/github': passport.authenticate('github', { scope: ['user:email'] }),
    // '/auth/github/callback': [passport.authenticate('github', { failureRedirect: '/signin' }), ctx => ctx.redirect('/')],
    // '/auth/wechat': passport.authenticate('wechat'),
    // '/auth/wechat/callback': passport.authenticate('wechat', { failureRedirect: '/signin', successReturnToOrRedirect: '/' }),

    // 'post /upload/file': 'upload.upload',
    // 'post /upload/image': 'upload.image',
    // 'post /upload/media': 'upload.media',
  
    '/upload': async ctx => await ctx.render('cos-upload.html'),
    '/login': async ctx => await ctx.render('login.html'),
    '/logout': 'auth.logout',
    '/signup': async ctx => await ctx.render('signup.html'),
    '/': async ctx => await ctx.render(DEV ? 'home.dev.html' : 'home.html'),
    '/*': async ctx => await ctx.render(DEV ? 'home.dev.html' : 'home.html'),
  }
);
module.exports = configRouter.router