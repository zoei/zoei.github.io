import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import enhanceApp from '../apps/portal/App'
import store, { createNewStore } from '../apps/portal/store'
import { matchPath } from 'react-router-dom'
import routes from '../apps/portal/routes'
// const store = createNewStore()

const minifier = require('html-minifier').minify

module.exports = (options) => {
  options = Object.assign({
    viewRoot: path.resolve(__dirname, '../apps'),
    minifyHTML: { enable: true }
  }, options)
  const { viewRoot, viewOptions, minifyHTML } = options

  const renderString = (ctx, next) => async (Cmp, props, tasksHandler, stateChangeHandler) => {
    if (typeof Cmp === 'string') {
      Cmp = require(path.resolve(viewRoot, Cmp))
      Cmp = Cmp.default || Cmp
    }

    let data = {}
    let stateReady

    if (Cmp && Cmp.setup) {
      await Cmp.setup(props)
      data = store.getState()
    }

    // 从组件的setup方法取得初始tasks，交由tasksHandler确认数据是否已经准备好并返回
    if (typeof tasksHandler === 'function' && Cmp.setup) {
      data = await tasksHandler(Cmp.setup(props))
    }

    // 监听Store变化，从Store中取得state，交由stateChangeHandler确认state是否已经准备好
    if (typeof stateChangeHandler === 'function') {
      if (stateChangeHandler(store.getState())) {
        data = store.getState()
      } else {
        stateReady = new Promise((resolve, reject)=>{
          let timer
          let unsubscribe = store.subscribe(()=>{
            let state = store.getState()
            if (stateChangeHandler(state)) {
              clearTimeout(timer)
              unsubscribe()
              resolve(state)
            }
          })
          timer = setTimeout(()=>{
            unsubscribe()
            reject('time out')
          }, 30000)
        })
      }
    }

    let App = enhanceApp(Cmp)
    let content = renderToString(
      <App
        location={ctx.url}
        context={{}}
        { ...(ctx.state || {}).props }
        { ...props }
      />
    )

    if (stateReady) data = await stateReady
    ctx.state.initialState = JSON.stringify(data)
    ctx.state.GDATA = JSON.stringify({
      url: ctx.url
    })

    if (minifyHTML.enable) {
      content = minifier(content, minifyHTML.options);
    }

    ctx.body = content
    return Promise.resolve(content)
  }

  const renderWithApp = (ctx, next) => async (Cmp, props) => {
    if (typeof Cmp === 'string') {
      Cmp = require(path.resolve(viewRoot, Cmp))
      Cmp = Cmp.default || Cmp
    }

    let data = {}
    if (Cmp) {
      let component = routes.find(route => matchPath(ctx.url, route)).component
      // let TargetComponent = routes.filter(route => matchPath(ctx.url.substr(7), route))

      let prefetchTasks = []
      // for (let route of TargetComponent) {
      //   let component = route.component
        if (component && component.WrappedComponent && component.WrappedComponent.setup) {
          let tasks = component.WrappedComponent.setup(props)
          if (Array.isArray(tasks)) {
            prefetchTasks = prefetchTasks.concat(tasks)
          } else if (tasks.then) {
            prefetchTasks.push(tasks)
          }
        }
      // }
      await Promise.all(prefetchTasks)
      data = store.getState()
    }

    let App = enhanceApp(Cmp)
    let content = renderToString(
      <App
        location={ctx.url}
        context={{}}
        { ...(ctx.state || {}).props }
        { ...props }
      />
    )

    ctx.state.initialState = JSON.stringify(data)
    ctx.state.GDATA = JSON.stringify({
      url: ctx.url
    })

    if (minifyHTML.enable) {
      content = minifier(content, minifyHTML.options);
    }

    ctx.body = content
    return Promise.resolve(content)
  }

  const render = (ctx, next) => async (viewPath, Cmp, props, tasksHandler, stateChangeHandler) => {
    // let content = await renderString(ctx, next)(Cmp, props, tasksHandler, stateChangeHandler)
    let content = await renderWithApp(ctx, next)(Cmp, props)
    await ctx.render(viewPath, { htmlString: content })
  }

  return async (ctx, next) => {
    ctx.renderReactString = renderString(ctx, next)
    ctx.renderReact = render(ctx, next)
    await next()
  }
}