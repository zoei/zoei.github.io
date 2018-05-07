const views = require('co-views')
const minifier = require('html-minifier').minify

module.exports = (options) => {
  options = Object.assign({
    viewRoot: 'views',
    viewOptions: { map: { html: 'nunjucks' } },
    minifyHTML: {
      enable: false,
      options: {
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeTagWhitespace: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }
  }, options)
  const { viewRoot, viewOptions, minifyHTML } = options
  const koaViewsRender = views(viewRoot, viewOptions)

  const render = (ctx, next) => async (templatePath, data = {}) => {
    let body = await koaViewsRender(templatePath, Object.assign(data, ctx.state))
    if (minifyHTML.enable) {
      body = minifier(body, minifyHTML.options);
    }
    ctx.body = body
  }

  return async (ctx, next) => {
    ctx.render = render(ctx, next)
    await next()
  }
}