import BaseApiService, { instanceFactory } from './BaseApiService'
/**
 * 认证相关的服务
 *
 * @export
 * @class AuthService
 * @extends {BaseApiService}
 */
export class WeixinService extends BaseApiService {

  MODULE = 'wxtest';
  API_VERSION = 'v1'

  constructor(props) {
    super(props)
    this.init()
    window.configShare = this.configShare
  }

  async init() {
    let payload = await this.sign()
    this.config(payload.data)
  }

  sign = ({ url = window.location.href } = {}) => {
    return this.fetch('sign', { url: encodeURIComponent(url) })
  }

  config = (options) => {
    if(!window.wx) return;
    let config = {
      ...options,
      debug: false
    }
    wx.config(config)
    wx.error(function(e){ console.log('error', e)})
    this.configShare()
  }

  configShare = (config = {}) => {
    let shareConfig = {
      title: config.title || '万园',
      desc: config.desc || '万园XXX',
      link: config.link || window.location.href,
      imgUrl: config.imgUrl || 'http://i3.s.7.hjfile.cn/entry/201501/871c9898-5b42-4494-9a20-934d9509f49e.png',
      success: config.success || function(e) {console.log('success', e)},
      cancel: config.cancel || function(e) {console.log('cancel', e)}
    }
    if(!window.wx) return
    wx.ready(function(){
      // 2.1 分享给朋友
      wx.onMenuShareAppMessage(shareConfig)
      // 2.2 分享到朋友圈
      wx.onMenuShareTimeline(shareConfig)
      // 2.3 分享到QQ
      wx.onMenuShareQQ(shareConfig)
      // 2.4 分享到微博
      wx.onMenuShareWeibo(shareConfig)
    })
  }

}

export default new WeixinService()
