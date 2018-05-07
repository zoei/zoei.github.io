const path = require('path');
const Deployer = require('ssh-deploy-release');
const inquirer = require('inquirer');

const DEPLOY_PATH = '/root/www/zoei.me'

function deploy(answers) {
  const options = Object.assign({
    localPath: path.resolve(__dirname, '../dist'),
    host: 'zoei.cc',
    username: 'root',
    deployPath: DEPLOY_PATH,
    onAfterDeployExecute: (context) => {
      context.logger.subhead('PM2 restart');
      return [
        `cd ${DEPLOY_PATH}/www && pm2 stop zoei.cc && pm2 delete zoei.cc && pm2 start bin/pm2.config.js`
      ];
    }
  }, answers);

  const deployer = new Deployer(options);
  deployer.deployRelease(() => {
    console.log('Ok !')
  });
}

inquirer.prompt([
  {
    type: 'password',
    name: 'password',
    message: 'SSH password'
  }
]).then(deploy);