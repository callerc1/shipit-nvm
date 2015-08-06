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

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.nvm = shipit.config.nvm || {};
    shipit.config.nvm.remote = typeof shipit.config.npm !== 'undefined' ? shipit.config.npm.remote !== false : shipit.config.nvm.remote === true;
    shipit.config.nvm.sh = shipit.config.nvm.sh || '/usr/local/nvm/nvm.sh';
    shipit.sharedPath = shipit.sharedPath || 'shared';

    shipit.config.nvm.triggerEvents = shipit.config.nvm.triggerEvents || {};

    var defaultTrigger = shipit.config.nvm.remote ? 'updated' : 'fetched';
    shipit.config.nvm.triggerEvents.aliasDefault = shipit.config.nvm.triggerEvents.aliasDefault !== undefined ? shipit.config.nvm.triggerEvents.aliasDefault : defaultTrigger;

    shipit.config.nvm.triggerEvents.unaliasDefault = shipit.config.nvm.triggerEvents.unaliasDefault !== undefined ? shipit.config.nvm.triggerEvents.unaliasDefault : false;

    // Allow for an absolute path
    if (!pathIsAbsolute(shipit.sharedPath)) {
      shipit.sharedPath = path.join(shipit.config.deployTo, shipit.sharedPath);
    }

    shipit.nvm_inited = true;
    shipit.emit('nvm_inited');

  }
};
