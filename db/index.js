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

module.exports = db