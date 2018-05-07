const Controller = require('../Controller')
const config = require('./config.json').cos
const CryptoJS = require('crypto-js')
const Capi = require('qcloudapi-sdk')

//通过构造函数传入的参数将作为默认配置
var capi = new Capi({
  SecretId: config.sid,
  SecretKey: config.skey,
  serviceType: 'scf',
  Region: config.region
})

module.exports = {
  request: async ctx => {
    try {
      let data = await (new Promise((resolve, reject) => {
        capi.request(ctx.query, {}, function(err, data) {
          if (err) return reject(err)
          return resolve(data)
        })
      }))
      ctx.body = data
    } catch (err) {
      ctx.body = err
    }
  },
  token: async (ctx, next) => {
    let random = parseInt(Math.random() * Math.pow(2, 32))
    let now = parseInt(new Date().getTime() / 1000)
    let e = now + 60 //签名过期时间为当前+60s
    let path = '' //多次签名这里填空
    let str = 'a=' + config.appid + '&k=' + config.sid + '&e=' + e + '&t=' + now + '&r=' + random +
            '&f=' + path + '&b=' + config.bucket
    let sha1Res = CryptoJS.HmacSHA1(str, config.skey) //这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
    let strWordArray = CryptoJS.enc.Utf8.parse(str)
    let resWordArray = sha1Res.concat(strWordArray)
    let res = resWordArray.toString(CryptoJS.enc.Base64)
    ctx.body = {
      code: 0,
      data: res,
      message: 'success'
    }
  }
}