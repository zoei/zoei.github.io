const log4js = require('log4js');
const logConfig = require('config').get('log');
log4js.configure({
  appenders: {
    mid: { type: 'file', filename: 'mid.log' },
    message: { type: 'file', filename: 'message.log' }
  },
  categories: { appenders: ['mid', 'message'], level: 'debug' }
});