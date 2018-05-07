const path = require('path')
let envConfig = {}
try {
  envConfig = require('./' + process.env.NODE_ENV)
} catch (err) {}

const config = Object.assign({
  public: 'static',
  host: '0.0.0.0',
  port: 18010,
  serverId: '1',
  log: {
    level: 'debug',
    path: path.resolve(__dirname, '../logs')
  },
  db: {
    path: path.resolve(__dirname, '../data')
  },
  static_root: path.resolve(__dirname, '../static'),
  app_root: path.resolve(__dirname, '../static'),
  account: {
    zoeicc: {
      token: 'zoeicc',
      encodingAESKey: 'jZEre1jalcuWVVWgcmIt73Ec9muZmTSAGFLjW6BjPKB',
      appid: 'wx01182dc42c4b0f75',
      appsecret: '3e66f6bd5c5048307361df826aefe1ce'
    },
    hm: {
      token: 'happymuslim',
      encodingAESKey: 'L9hz7huZepBIncnErSqOhoelFm6S9l6FE5IT0FkqKMy',
      appid: 'wx49270328cfa9d181',
      appsecret: 'd9a89f9aee05a0193cfa5f1c1c3bd7ce'
    },
    test: {
      token: 'zoei',
      encodingAESKey: 'XOPqtlT3Be3hFkeTSgYmowMb8TBqGsZbK8ntasB1yrQ',
      appid: 'wxb1e15dc25e06a5b5',
      appsecret: 'd005b1c83b7ef36f904dd2d25e4e9966'
    },
    app: {
      token: 'zoei',
      encodingAESKey: 'Rge4WLsJjH9nRSojYAiNwnaL3ZO0k48ikMQsT7mUi2I',
      appid: 'wx06fb797c965c38a6',
      appsecret: 'ea3350446de6d1f91767efc3ce1024bc'
    },
    weibo: {
      appid: '3857479967',
      appsecret: '1fe1dbb6ddf78d49a093fdd1e780f6d2'
    }
  }
}, envConfig)

module.exports = config
module.exports.get = function(key) {
  return key.split('.').reduce((prev, name) => {
    return prev[name]
  }, config)
}