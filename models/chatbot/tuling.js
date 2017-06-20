const secret = '207aece4bea9e2abONOFF'
const APIKey = 'dad8d3c02f6ca39257da3c89417b74e2'

module.exports = {
  async chat(msg) {
    try {
      let res = await fetch('http://openapi.tuling123.com/openapi/api/v2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          "perception": {
            "inputText": {
              "text": msg
            }
          },
          "userInfo": {
            "apiKey": APIKey,
            "userId": 169108
          }
        })
      })
      res = await res.json()
      const { intent, results } = res
      let re = results.map(({ groupType, resultType, values })=>{
        return values[resultType]
      }).join('\n')
      return Promise.resolve(re)
    } catch(e) {
      console.log('e', e)
      return Promise.reject(e)
    }
  }
}