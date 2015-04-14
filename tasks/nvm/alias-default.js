var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var Bluebird = require('bluebird');

/**
 * Runs nvm alias default
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'nvm:alias-default', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    function aliasDefault(remote) {

      if(!remote) {
        throw new Error(
          shipit.log(
            chalk.red('shipit.config.nvm.remote is', remote),
            chalk.gray('try running nvm:init before nvm:alias-default')
          )
        );
      }

      var method = remote ? 'remote' : 'local';

      return shipit[method](
         sprintf('cat %s/.nvmrc', shipit.sharedPath)
      )
      .then(function (res) {
        console.log(res[0].stdout);
        v = res[0].stdout;

        return shipit[method](
          sprintf('. %s && nvm use %s && nvm alias default %s', shipit.config.nvm.sh, v, v)
        );
      });

    }
    shipit.log('running nvm alias default');
    return aliasDefault(shipit.config.nvm.remote)
    .then(function () {
      shipit.emit('npm_pre_install_complete')
    })
    .then(function () {
      shipit.log(chalk.green('nvm alias default complete'));
    })
    .catch(function (e) {
      shipit.log(e);
    });
  }
};
