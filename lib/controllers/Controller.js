module.exports = class Controller {
  get() {}
  post() { return this.get.apply(this, arguments) }
  put() { return this.post.apply(this, arguments) }
  delete() { return this.get.apply(this, arguments) }
  update() { return this.get.apply(this, arguments) }
}