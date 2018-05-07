const path = require('path')
const datastore = require('nedb-promise')
const DATA_ROOT = path.resolve(__dirname, '../data')

let db = {}

function getDataStroe(namespace, options, filename = namespace) {
  if (!db[namespace]) {
    db[namespace] = datastore(Object.assign({
      filename: `${DATA_ROOT}/${filename}.db`,
      autoload: true
    }, options))
  }
  return db[namespace]
}

getDataStroe('wechat')

module.exports = getDataStroe