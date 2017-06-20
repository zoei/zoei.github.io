var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userid: String,
  username: String,
  password: String
})

UserSchema.methods = {
}

UserSchema.statics = {
  add(data) {
    return new User(data).save().exec()
  },
  get(query) {
    return this.findOne(query).exec()
  }
}

module.exports = mongoose.model('User', UserSchema)