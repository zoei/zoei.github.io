function setRes(data) {
  ctx.body = data
}

function apiRes(code, payload, message) {
  if (code === 0) {
    ctx.body = {
      code,
      data: payload
    }
  } else {
    ctx.body = Object.assign({
      code,
      message
    }, payload)
  }
}

module.exports = (opts, app) => {
  return async (ctx, next) => {
    ctx.setRes = setRes
    ctx.apiRes = apiRes
    await next()
  }
}