class Namespace {

  constructor(storage, name = 'global') {
    this.name = name
    this.storage = storage
    this.cache = this.storage.loadNamespace(this) || {}
  }

  reset(data) {
    this.cache = data || {}
    this.storage.saveNamespace(this)
  }

  set(key, value) {
    this.cache[key] = value
    this.storage.saveNamespace(this)
  }

  get(key) {
    return this.cache[key]
  }

  remove(key) {
    delete this.cache[key]
    this.storage.saveNamespace(this)
  }
}

export default class Storage {

  static KEY = 'cctalk.hujiang.com'

  constructor(storage = window.localStorage) {
    this.$storage = storage
    try {
      this.cache = JSON.parse(this.$storage.getItem(Storage.KEY)) || {}
    } catch (e) {
      console.debug('storage not support', e)
      this.cache = {}
    }
    this.namespaces = {}
  }

  namespace(name) {
    let namespace = null

    if (this.namespaces[name]) {
      namespace = this.namespaces[name]
    }

    namespace = new Namespace(this, name)
    this.namespaces[name] = namespace

    if (this.cache[name]) {
      namespace.reset(this.cache[name])
    }

    return namespace
  }

  saveNamespace(namespace) {
    this.cache[namespace.name] = namespace.cache
    this.save()
  }

  loadNamespace(namespace) {
    return this.cache[namespace.name]
  }

  save() {
    try {
      this.$storage.setItem(Storage.KEY, JSON.stringify(this.cache))
    } catch (e) {
      console.debug('save error', e)
    }
  }

  load() {
    try {
      this.cache = JSON.parse(this.$storage.getItem(Storage.KEY))
      return this.cache
    } catch (e) {
      console.debug('load error', e)
      return {}
    }
  }
}