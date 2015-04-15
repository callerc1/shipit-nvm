var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var Bluebird = require('bluebird');
var argv = require('yargs').argv;

/**
 * cmd task allows access to any nvm cli command
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'nvm:cmd', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    function cmd(remote) {

      var method = remote ? 'remote' : 'local';
      var cdPath = remote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace;

      if(!cdPath) {
        var msg = remote ? 'Please specify a deploy to path (shipit.config.deployTo).' : 'Please specify a workspace (shipit.config.workspace)';
        throw new Error(
          shipit.log(chalk.red(msg))
        );
      }

      if(!argv.cmd) {
        throw new Error(
          shipit.log(
            chalk.red('Please specify a nvm command eg'),
            chalk.gray('shipit staging nvm:cmd'),
            chalk.white('--cmd "install 0.10.37"')
          )
        );
      }

      return shipit[method](
        sprintf('cd %s && nvm %s', cdPath, argv.cmd)
      );

    }

    shipit.log('Running - nvm ' + argv.cmd);

    if(shipit.nvm_inited) {

      return cmd(shipit.config.nvm.remote)
      .then(function () {
        shipit.log(chalk.green('Complete - nvm ' + argv.cmd));
      })
      .catch(function (e) {
        shipit.log(chalk.red(e));
      });

    }else {
      throw new Error(
        shipit.log(
          chalk.gray('try running nvm:init before nvm:cmd')
        )
      );
    }
  }
};
