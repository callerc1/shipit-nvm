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

      var method = remote ? 'remote' : 'local';
      var nvmrcPath = remote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace;

      //if .nvmrc is a shared file.
      if(remote && shipit.config.shared.files.indexOf('.nvmrc') >= 0){
        nvmrcPath = shipit.sharedPath;
      }

      nvmrcPath = remote ? nvmrcPath+'/' : nvmrcPath;

      return shipit[method](
         sprintf('cat %s.nvmrc', nvmrcPath)
      )
      .then(function (res) {

        v = remote ? res[0].stdout : res.stdout;

        return shipit[method](
          sprintf('. %s && nvm use %s', shipit.config.nvm.sh, v)
        );
      });

    }

    if(shipit.nvm_inited) {

      return use(shipit.config.nvm.remote)
      .then(function () {
        shipit.log(chalk.green('nvm use complete'));
      })
      .catch(function (e) {
        shipit.log(chalk.red(e));
      });

    }else {
      throw new Error(
        shipit.log(
          chalk.gray('try running nvm:init before nvm:use')
        )
      );
    }
  }
};
