let context = {

}

export function getContext(key) {
  return context[key]
}

export function setContext(key, value) {
  return context[key] = value
}