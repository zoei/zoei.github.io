const Controller = require('../Controller')
const config = require('config').get('account.hm')
const api = require('./api')(config)

module.exports = {
  msg: api.handleMessage,
  menu: async (ctx, next) => {
    ctx.body = await api.getMenu()
  },
  sign: async (ctx, next) => {
    let config = await api.getJsConfig({
      url: ctx.query.url,
      jsApiList: [
        'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
      ]
    })
    ctx.body = {
      status: 0,
      message: '',
      data: config
    }
  }
}