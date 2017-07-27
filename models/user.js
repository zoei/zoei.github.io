const db = require('../db')
const User = db('user')

class UserSchema {
  constructor() {
    // User.insert({ username: 'zoei', password: 'zoei' })
  }
  add(user) {
    return User.insert(user)
  }
  update(condition, user) {
    return User.update(condition, { $set: user })
  }
  get(condition) {
    return User.findOne(condition)
  }
  getUsers(condition) {
    return User.find(condition)
  }
}

module.exports = new UserSchema()