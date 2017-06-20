module.exports = {
  get: async (ctx) => {
    await ctx.renderApp('home.html', { url: ctx.url, title: '酌酒花间', text: 'hi' })
  }
}