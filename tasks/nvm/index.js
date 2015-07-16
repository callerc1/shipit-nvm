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

      shipit.start('nvm:init');

      shipit.on('nvm_inited', function () {

        if (shipit.config.nvm.triggerEvents.aliasDefault) {
          shipit.on(shipit.config.nvm.triggerEvents.aliasDefault, function(){
            shipit.start('nvm:alias-default');
          });
        }

        if (shipit.config.nvm.triggerEvents.unaliasDefault) {
          shipit.on(shipit.config.nvm.triggerEvents.unaliasDefault, function () {
            shipit.start('nvm:unalias-default');
          });
        }

      });
    });

  });

};