let serverId = require('config').get('serverId')
module.exports = () => async (ctx, next)=> {
  await next()
  ctx.set('Server-ID', serverId)
}