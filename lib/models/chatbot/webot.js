var webot = require('weixin-robot');

var zoeiWebot = new webot.Webot();

// 指定回复消息
zoeiWebot.set('hi', '你好');

zoeiWebot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅微信机器人';
  }
});

zoeiWebot.set('test', {
  pattern: /^test/i,
  handler: function(info, next) {
    next(null, 'roger that!')
  }
})

// 接管消息请求
export default app => zoeiWebot.watch(app, { token: 'zoei', path: '/wechat' });