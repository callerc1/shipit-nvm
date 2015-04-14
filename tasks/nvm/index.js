var utils = require('shipit-utils');

/**
 * Register NVM tasks.
 * - nvm
 * - nvm:use
 * - nvm:run
 */

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./alias-default')(gruntOrShipit);
  require('./unalias-default')(gruntOrShipit);
  require('./cmd')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'nvm:run', [
    'npm:init',
    'nvm:cmd'
  ]);

  shipit.on('deploy', function () {

    utils.runTask(gruntOrShipit, 'nvm:init')

    shipit.on('nvm_inited', function () {

      shipit.on('npm_preinstall', function () {
        utils.runTask(gruntOrShipit, 'nvm:alias-default');
      });

      shipit.on('npm_installed', function () {
        utils.runTask(gruntOrShipit, 'nvm:unalias-default');
      });

    });

  });



};