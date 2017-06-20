var oauthserver = require('koa-oauth-server')
var model = require('../models/mongo_auth')

module.exports = oauth = oauthserver({
  model: authModel,
  grants: ['password'],
  debug: true
})

// auth
// app.auth = require('./middlewares/oauth')
// app.use(app.oauth.authorise())
// router.post('/token', app.oauth.grant());