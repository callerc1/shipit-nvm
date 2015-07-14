var utils = require('shipit-utils');

/**
 * Register NVM tasks.
 * - nvm:run
 */

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./alias-default')(gruntOrShipit);
  require('./unalias-default')(gruntOrShipit);
  require('./cmd')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'nvm:run', [
    'nvm:init',
    'nvm:cmd'
  ]);

  shipit.on('deploy', function () {

    shipit.on('npm_inited', function () {

      utils.runTask(gruntOrShipit, 'nvm:init')

      shipit.on('nvm_inited', function () {

        utils.runTask(gruntOrShipit, 'nvm:alias-default');

        shipit.on('npm_installed', function () {
          utils.runTask(gruntOrShipit, 'nvm:unalias-default');
        });

      });
    });

  });

};