var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var Bluebird = require('bluebird');

/**
 * Runs nvm unalias default
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'nvm:unalias-default', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    function unaliasDefault(remote) {

      if(!remote) {
        throw new Error(
          shipit.log(
            chalk.red('shipit.config.nvm.remote is', remote),
            chalk.gray('try running nvm:init before nvm:unalias-default')
          )
        );
      }

      var method = remote ? 'remote' : 'local';

      return shipit[method](
        sprintf('. %s && nvm unalias default', shipit.config.nvm.sh)
      );

    }
    shipit.log('running nvm unalias default');
    return unaliasDefault(shipit.config.nvm.remote)
    .then(function () {
      shipit.log(chalk.green('nvm unalias default complete'));
    })
    .catch(function (e) {
      shipit.log(e);
    });
  }
};
