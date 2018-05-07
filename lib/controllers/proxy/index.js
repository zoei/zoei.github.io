const os = require('os')
const Controller = require('../Controller')
const config = require('./config.json')

const PROXY_PORT = parseInt(process.env.PORT) || 8888

function getIPv4() {
  try{
    let IPv4, ens = os.networkInterfaces().en5 || os.networkInterfaces().en0;

    for(var i=0; i< ens.length; i++){
      if(ens[i].family == 'IPv4') {
        IPv4 = ens[i].address
      }
    }
    return IPv4
  } catch(e) {
    console.log('getIPv4 error', e)
    return '192.168.186.111'
  }
}


function getProxyContents(includes, port = PROXY_PORT, ip = getIPv4()) {
  return `function FindProxyForURL(url, host) {
url = url.toLowerCase();
host = host.toLowerCase();

var domins = ${JSON.stringify(includes)};

if(domins.indexOf(host) !== -1){
  return "PROXY ${ip}:${port};PROXY ${ip}:${port + 1}";
}
return "DIRECT";
}`
}

module.exports = {
  get: (ctx, next) => {
    ctx.response.set('Content-Type', 'application/javascript')
    ctx.body = getProxyContents(config.domins.dev.concat(config.domins.qa).concat(config.domins.yz).concat(config.domins.release), ctx.query.port || PROXY_PORT)
  },
  dev: (ctx, next) => {
    ctx.response.set('Content-Type', 'application/javascript')
    ctx.body = getProxyContents(config.domins.dev, ctx.query.port || PROXY_PORT)
  },
  qa: (ctx, next) => {
    ctx.response.set('Content-Type', 'application/javascript')
    ctx.body = getProxyContents(config.domins.qa, ctx.query.port || PROXY_PORT)
  },
  yz: (ctx, next) => {
    ctx.response.set('Content-Type', 'application/javascript')
    ctx.body = getProxyContents(config.domins.yz, ctx.query.port || PROXY_PORT)
  },
  release: (ctx, next) => {
    ctx.response.set('Content-Type', 'application/javascript')
    ctx.body = getProxyContents(config.domins.release, ctx.query.port || PROXY_PORT)
  }
}