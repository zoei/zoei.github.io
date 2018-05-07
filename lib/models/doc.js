const Doc = require('../db')('docs')

class DocSchema {
  constructor() {
  }
  add(user) {
    return User.insert(user)
  }
  update(condition, user) {
    return User.update(condition, { $set: user }, { upsert: true })
  }
  get(condition) {
    return User.findOne(condition)
  }
  getUsers(condition) {
    return User.find(condition)
  }
}

module.exports = new DocSchema()