var utils = require('shipit-utils');
var path = require('path');
var pathIsAbsolute = require('path-is-absolute');

/**
 * Init task.
 * - Emit nvm_inited event.
 */
module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'nvm:init', task);

  function task() {


    /**
    * Create nvm object for options
    */
    var shipit = utils.getShipit(gruntOrShipit);
    shipit.log("inside NVM init");

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.nvm = shipit.config.nvm || {};
    //if 'npm remote' is defined (so true or false or not null/undefined) set 'nvm remote' to match its value else default 'nvm remote' to true
    shipit.config.nvm.remote = shipit.config.nvm.remote !== false;
    shipit.config.nvm.sh = shipit.config.nvm.sh || '/usr/local/nvm/nvm.sh';

    shipit.sharedPath = shipit.sharedPath || 'shared';

    shipit.log(shipit.config.deployTo);
    shipit.log(shipit.sharedPath);

    // Allow for an absolute path
    if (!pathIsAbsolute(shipit.sharedPath)) {
      shipit.sharedPath = path.join(shipit.config.deployTo, shipit.sharedPath);
    }

    shipit.emit('nvm_inited');
  }
};
