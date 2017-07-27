const isSSR = process.env.MODE === 'SSR'
const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  get: async (ctx) => {
    if (isSSR) {
      await ctx.renderApp('home.ssr.html', { url: ctx.url, title: '酌酒花间', text: 'hi' })
    } else if (isDEV) {
      await ctx.render('home.dev.html', { title: '酌酒花间' })
    } else {
      await ctx.render('home.html', { title: '酌酒花间' })
    }
  }
}