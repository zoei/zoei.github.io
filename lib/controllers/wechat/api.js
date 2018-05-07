const wechat = require('co-wechat')
const WechatAPI = require('co-wechat-api');
const chatbot = require('../../models/chatbot/tuling')
const wechatDB = require('../../db')('wechat')
const sign = require('../../utils/wechat-utils')

module.exports = config => {
  const { appid, appsecret } = config
  const api = new WechatAPI(appid, appsecret, async()=>{
    let data = await wechatDB.findOne({ appid, key: 'access_token' })
    return data || {}
  }, async (token)=>{
    wechatDB.update({ appid, key: 'access_token' }, { $set: token }, { upsert: true })
  })
  
  api.registerTicketHandle(async type=> {
    try {
      let doc = await wechatDB.findOne({ appid, type, key: 'ticket_token' })
      if (!doc) return null
      return doc.value
    } catch(e) {
      console.log('getTicket', e)
      return e
    }
  }, async (type, ticketToken)=>{
    try {
      wechatDB.update({ appid, type, key: 'ticket_token'}, { $set: { value: ticketToken } }, { upsert: true })
    } catch(e) {
      console.log('setTicket', e)
    }
  })
  api.handleMessage = async(ctx, next) => {
    await wechat(config).middleware(async (message, ctx) => {
      const { ToUserName, FromUserName, CreateTime, MsgType, Content, MsgId, MediaId, Recognition } = message
      let reply = '我听不懂你在说什么'
      try {
        if (MsgType === 'voice' && Recognition) {
          reply = await chatbot.chat(Recognition)
        } else {
          ctx.logger('message').debug(`[${config.appid}] From ${FromUserName}: (${MsgType})${Content}`)
          reply = (await chatbot.chat(Content)) || reply
        }
      } catch(err) {
        console.log('handle message error', err)
      }
      return reply
    })(ctx, next)
  }
  return api
}