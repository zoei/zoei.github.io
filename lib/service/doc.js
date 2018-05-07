const docs = require('../db')('docs')
const tags = require('../db')('tags')
const uuid = require('uuid')

const genId = () => Date.now()
const STATUS = {
  NORMAL: 0,
  HIDDEN: 1,
  DELETED: 2
}

module.exports = {
  async createDoc({ tags: tagList, ...data }) {
    try {
      let id = genId()
      let newData = { id, tags: tagList, ...data, status: STATUS.NORMAL }
      tagList.forEach(async tag => {
        await tags.update({ tag }, { tag }, { upsert: true })
      })
      await docs.insert(newData)
      return Promise.resolve(newData)
    } catch(err) {
      return Promise.reject(err)
    }
  },
  deleteDoc({ id }) {
    return docs.update({ id }, { $set: { status: STATUS.DELETED } })
  },
  updateDoc(query, newData) {
    return docs.insert(query, { $set: newData })
  },
  getDoc({ id }) {
    return docs.findOne({ id })
  },
  queryDocs({ tag, keyword, start = 0, limit = 10, sort = { createTime: -1 } }) {
    let query = {}
    if (tag) query.tags = tag
    if (keyword) query.title = new RegExp(keyword)
    return docs.cfind(query).skip(start).limit(limit).sort(sort).exec()
  },
  queryTags() {
    return tags.find({})
  }
}