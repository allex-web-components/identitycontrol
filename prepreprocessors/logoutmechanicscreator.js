function createLogoutMechanicsPrePreprocessor (execlib, applib, templatelib, htmltemplatelib){
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function LogoutMechanicsPrePreprocessor (options){
    BasicProcessor.call(this, options);
  }
  lib.inherit(LogoutMechanicsPrePreprocessor, BasicProcessor);
  LogoutMechanicsPrePreprocessor.prototype.process = function(desc){
    var envname = this.config.environmentname;
    desc.links.push({
      source: 'environment.' + envname + ':state',
      target: 'element.' + this.config.pathtologinform + ':actual',
      filter: function(state){
        return state === 'established';
      }
    },{
      source: 'element.' + this.config.pathtologinform + '!clicked',
      target: 'environment.' + envname + '>logout',
      filter: function () {
        console.log('logout clicked', arguments);
      }
    });
  };
  LogoutMechanicsPrePreprocessor.prototype.neededConfigurationNames = ['environmentname', 'pathtologinform'];

  applib.registerPrePreprocessor('LogoutMechanics', LogoutMechanicsPrePreprocessor);
}

module.exports = createLogoutMechanicsPrePreprocessor;
