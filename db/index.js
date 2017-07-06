import path from 'path'

const datastore = require('nedb-promise')

let db = {}

db.common = datastore({
  filename: path.resolve(__dirname, './global.db'),
  autoload: true
})

db.wechat = datastore({
  filename: path.resolve(__dirname, './wechat.db'),
  autoload: true
})

db.docs = datastore({
  filename: path.resolve(__dirname, './docs.db'),
  autoload: true
})

module.exports = (namespace) => {
  if (!db[namespace]) {
    db[namespace] = datastore({
      filename: path.resolve(__dirname, './' + namespace + '.db'),
      autoload: true
    })
  }
  return db[namespace]
}