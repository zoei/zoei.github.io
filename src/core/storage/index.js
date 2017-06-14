import Storage from './Storage'

function getLocalStorage() {
  const store = new Storage(window.localStorage)
  window.localStore = store
  let storageNamespace = store.namespace.bind(store)
  return storageNamespace
}

function getSessionStorage() {
  const store = new Storage(window.sessionStorage)
  window.sessionStore = store
  let storageNamespace = store.namespace.bind(store)
  return storageNamespace
}

export const localStorage = getLocalStorage()
export const sessionStorage = getSessionStorage()