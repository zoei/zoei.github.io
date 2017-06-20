const { renderComponent, renderApp } = require('./vue')
const minifier = require('html-minifier').minify

module.exports = (root, options) => {
  options = Object.assign({
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
  const { minifyHTML } = options
  const componentRender = renderComponent(root, options)
  const appRender = renderApp(root, options)

  const renderVue = (ctx, next) => async (component, templatePath, data = {}) => {
    let body = await componentRender(component, templatePath, Object.assign(data, ctx.state))
    if (minifyHTML.enable) {
      body = minifier(body, minifyHTML.options);
    }
    ctx.body = body
  }

  const renderVueApp = (ctx, next) => async (templatePath, data = {}) => {
    let body = await appRender(templatePath, Object.assign(data, ctx.state))
    if (minifyHTML.enable) {
      body = minifier(body, minifyHTML.options);
    }
    ctx.body = body
  }

  return async (ctx, next) => {
    ctx.render = renderVue(ctx, next)
    ctx.renderApp = renderVueApp(ctx, next)
    await next()
  }
}