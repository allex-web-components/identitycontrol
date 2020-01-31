function createLogoutModifier (execlib, applib, templatelib, htmltemplatelib){
  'use strict';

  var lib = execlib.lib,
    BasicModifier = applib.BasicModifier;

  function LogoutModifier (options){
    BasicModifier.call(this, options);
  }
  lib.inherit(LogoutModifier, BasicModifier);
  LogoutModifier.prototype.doProcess = function (name, options, links, logic, resources){
    var logoutbuttonname = this.getConfigVal('logoutbuttonname') || 'logoutbutton';
    options.elements.push(lib.extend({
      name: logoutbuttonname,
      type: 'ClickableElement',
      options: {
        actual: false,
        clickable: {
          text: 'Logout'
        },
        self_selector: '.'
      }
    }, this.config));
    handleIgnoreChildActualChange(options, logoutbuttonname);
  };
  LogoutModifier.prototype.DEFAULT_CONFIG = function(){
    return {
    };
  };

  applib.registerModifier('Logout', LogoutModifier);


  function handleIgnoreChildActualChange (options, logoutbuttonname) {
    var oicac = options.ignorechildactualchange;
    if (oicac === true) {
      return;
    }
    if (!oicac) {
      options.ignorechildactualchange = [logoutbuttonname];
      return;
    }
    if (lib.isString(oicac)) {
      options.ignorechildactualchange = [oicac, logoutbuttonname];
      return;
    }
    if (lib.isArray(oicac)) {
      options.ignorechildactualchange.push(logoutbuttonname);
    }
  }
}

module.exports = createLogoutModifier;
