const replies = require('../db')('replies')
const uuid = require('uuid')

const genId = () => Date.now()
const STATUS = {
  NORMAL: 0,
  HIDDEN: 1,
  DELETED: 2
}

module.exports = {
  async createReply(data) {
    let id = genId()
    let newData = { id, ...data, status: STATUS.NORMAL, createTime: Date.now() }
    return replies.insert(newData)
  },
  deleteReply({ id }) {
    return replies.update({ id }, { $set: { status: STATUS.DELETED } })
  },
  updateReply(query, newData) {
    return replies.update(query, { $set: newData })
  },
  getReply({ id }) {
    return replies.findOne({ id })
  },
  queryReplies({ query, start = 0, limit = 10, sort = { createTime: 1 } }) {
    return replies.cfind(query).skip(start).limit(limit).sort(sort).exec()
  },
  queryCommentReplies({ commentId, start = 0, limit = 10, sort = { createTime: 1 } }) {
    return replies.cfind({ commentId }).skip(start).limit(limit).sort(sort).exec()
  }
}