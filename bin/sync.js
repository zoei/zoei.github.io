const path = require('path');
const Deployer = require('ssh-deploy-release');
const inquirer = require('inquirer');

const DEPLOY_PATH = '/root/www/zoei.me'

function deploy(answers) {
  const options = Object.assign({
    mode: 'synchronize',
    synchronizedFolder: 'www',
    rsyncOptions : '--exclude-from="bin/rsync-excludes.txt" --delete-excluded',
    share: {
      'data': {
          symlink: 'data',
          mode: '777' // Will chmod 777 shared/upload
      }
    },
    localPath: path.resolve(__dirname, '..'),
    host: 'zoei.cc',
    username: 'root',
    deployPath: DEPLOY_PATH,
    onAfterDeployExecute: (context) => {
      context.logger.subhead('PM2 restart');
      return [
        'pm2 stop zoei.me',
        'pm2 delete zoei.me',
        `pm2 start ${DEPLOY_PATH}/www/bin/pm2.config.js`
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