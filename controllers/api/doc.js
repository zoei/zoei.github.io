import fs from 'fs'
import db from '../../db'
const docs = db('docs')

module.exports = {
  create: async (ctx) => {
    const { title, author, content } = ctx.request.body
    let id = '' + Date.now()
    let fileName = id + '.md'
    try {
      let d = await new Promise((resolve, reject) => {
        fs.writeFile(ctx.docDir + '/' + fileName, content, function(err, data){
          if (err) {
            reject(err)
          } else {
            resolve({
              code: 0,
              msg: 'success',
              data: {
                id,
                fileName,
                url: '/static/docs/' + fileName,
                title,
                author,
                summary: content.split('\n')[0],
                createTime: Date.now()
              }
            })
          }
        })
      })
      await docs.insert(d.data)
      ctx.sendJSON(d)
    } catch (e) {
      console.log('e', e)
      ctx.sendJSON({
        code: -1000,
        msg: 'failed'
      })
    }
  },
  update: async (ctx) => {
    const { id, title, author, content } = ctx.request.body
    let fileName = id + '.md'
    try {
      let doc = await docs.findOne({ id })
      if (!doc) {
        return ctx.sendJSON({
          code: -1001,
          msg: '文件不存在'
        })
      }
      let d = await new Promise((resolve, reject) => {
        fs.writeFile(ctx.docDir + '/' + fileName, content, function(err, data){
          if (err) {
            reject(err)
          } else {
            resolve({
              code: 0,
              msg: 'success',
              data: {
                id,
                fileName,
                url: '/static/docs/' + fileName,
                title,
                author,
                summary: content.split('\n')[0],
                updateTime: Date.now()
              }
            })
          }
        })
      })
      await docs.update({ id }, { $set: d.data })
      ctx.sendJSON({ ...d, data: { ...doc, ...d.data } })
    } catch (e) {
      console.log('e', e)
      ctx.sendJSON({
        code: -1001,
        msg: 'failed'
      })
    }
  },
  delete: async (ctx) => {
    try {
      console.log('id', ctx.params.id)
      let doc = await docs.remove({ id: ctx.params.id })
      ctx.sendJSON({
        code: 0,
        data: doc
      })
    } catch(e) {
      console.log('e', e)
      ctx.sendJSON({
        code: -1002,
        msg: 'failed'
      })
    }
  },
  getList: async (ctx) => {
    try {
      ctx.sendJSON({
        code: 0,
        data: await docs.find({})
      })
    } catch(e) {
      console.log('e', e)
      ctx.sendJSON({
        code: -1003,
        msg: 'failed'
      })
    }
  },
  get: async (ctx) => {
    try {
      let doc = await docs.findOne({ id: ctx.params.id })
      ctx.sendJSON({
        code: 0,
        data: doc
      })
    } catch(e) {
      console.log('e', e)
      ctx.sendJSON({
        code: -1004,
        msg: 'failed'
      })
    }
  }
}