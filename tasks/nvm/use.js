var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var Bluebird = require('bluebird');

/**
 * Runs nvm use
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'nvm:use', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    function use(remote) {

      if(!remote) {
        throw new Error(
          shipit.log(
            chalk.red('shipit.config.nvm.remote is', remote),
            chalk.gray('try running nvm:init before nvm:use')
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
          sprintf('. %s && nvm use %s', shipit.config.nvm.sh, v)
        );
      });

    }
    shipit.log('running nvm use');
    return use(shipit.config.nvm.remote)
    .then(function () {
      shipit.log(chalk.green('nvm use complete'));
    })
    .catch(function (e) {
      shipit.log(e);
    });
  }
};
