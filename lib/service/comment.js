const comments = require('../db')('comments')
const docComments = require('../db')('doc_comment')
const uuid = require('uuid')

const genId = () => Date.now()
const STATUS = {
  NORMAL: 0,
  HIDDEN: 1,
  DELETED: 2
}

module.exports = {
  async createComment({ docId, ...data }) {
    let id = genId()
    let newData = { id, ...data, status: STATUS.NORMAL, createTime: Date.now() }
    try {
      await comments.insert(newData)
      await docComments.insert({ docId, commentId: id })
      return Promise.resolve(newData)
    } catch(err) {
      return Promise.reject(err)
    }
  },
  deleteComment({ id }) {
    return comments.update({ id }, { $set: { status: STATUS.DELETED } })
  },
  updateComment(id, newData) {
    return comments.insert(query, { $set: newData })
  },
  getComment({ id }) {
    return comments.findOne({ id })
  },
  queryComments({ keyword, start = 0, limit = 10, sort = { createTime: 1 } }) {
    return comments.cfind({
      content: new RegExp(keyword)
    }).skip(start).limit(limit).sort(sort).exec()
  },
  async queryDocComments({ docId, start = 0, limit = 10, sort = { createTime: 1 } }) {
    try {
      const commentList = await docComments.cfind({ docId }).skip(start).limit(limit).sort(sort).exec()
      return comments.cfind({ id: { $in: commentList.map(comment => comment.commentId) } }).sort(sort).exec()
    } catch(err) {
      return Promise.reject(err)
    }
  }
}