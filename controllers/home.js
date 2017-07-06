const isSSR = process.env.MODE === 'SSR'
module.exports = {
  get: async (ctx) => {
    if (isSSR) {
      await ctx.renderApp('home.html', { url: ctx.url, title: '酌酒花间', text: 'hi' })
    } else {
      await ctx.render('home.dev.html', { title: '酌酒花间' })
    }
  }
}