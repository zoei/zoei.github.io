const vsr = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

module.exports = {
  renderComponent (viewRoot, options) {
    return (component, viewPath, context) => {
      return new Promise((resolve, reject)=>{
        vsr.createRenderer({
          template: fs.readFileSync(path.resolve(viewRoot, viewPath), 'utf-8')
        }).renderToString(component, context, (err, html) => {
          if (err) return reject(err)
          resolve(html)
        })
      })
    }
  },
  renderApp (viewRoot, options) {
    const appBundle = require(options.appBundle)
    const clientManifest = require(options.clientManifest)
    return (viewPath, context) => {
      return new Promise((resolve, reject)=>{
        const bundleRenderer = vsr.createBundleRenderer(appBundle, {
          template: fs.readFileSync(path.resolve(viewRoot, viewPath), 'utf-8'),
          clientManifest
        })
        bundleRenderer.renderToString(context, (err, html) => {
          if (err) {
            console.log('createBundleRenderer error', err)
            return reject(err)
          }
          resolve(html)
        })
      })
    }
  }
}