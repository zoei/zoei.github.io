const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'production'
module.exports = {
  apps: [
    {
      name: 'zoei.me',
      script: path.resolve(__dirname, '../lib/index.js'),
      exec_interpreter: 'node',
      watch: false,
      env: {
        NODE_ENV: NODE_ENV,
        PORT: 18010,
        LOG_FILE_PATH: `${process.env.HOME}/logs/zoei.me/logstash.log`
      },
      env_production: {
        NODE_ENV: NODE_ENV
      },
      out_file: `${process.env.HOME}/logs/zoei.me/pm2-web.log`,
      error_file: `${process.env.HOME}/logs/zoei.me/pm2-error.log`,
      exec_mode: NODE_ENV === 'production' ? 'cluster' : 'fork',
      instances: 2
    }
  ]
}