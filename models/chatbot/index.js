const EMAIL = 'zoei@163.com'
const APP_KEY = 'fef23dd547155678d50bc124eb9d129d'
module.exports = {
  async chat(msg) {
    try {
      let res = await fetch(`http://dev.skjqr.com/api/weixin.php?email=${EMAIL}&appkey=${APP_KEY}&msg=${encodeURIComponent(msg)}`)
      let re = await res.text()
      if (/^\[msg\](.*)\[\/msg\]$/.test(re)) {
        re = RegExp.$1
      }
      return Promise.resolve(re)
    } catch(e) {
      return Promise.reject(e)
    }
  }
}