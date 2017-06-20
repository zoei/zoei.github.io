module.exports = () => {
  function sendJSON(json) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
    ctx.sendJSON = sendJSON.bind(ctx)
    await next()
  }
}