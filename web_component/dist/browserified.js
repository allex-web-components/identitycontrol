(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function createIdentityControl (execlib) {
  'use strict';
  var lib = execlib.lib,
    execSuite = execlib.execSuite,
    applib = execSuite.libRegistry.get('allex_applib'),
    templatelib = execSuite.libRegistry.get('allex_templateslitelib'),
    htmltemplatelib = execSuite.libRegistry.get('allex_htmltemplateslib');

  require('./modifiers')(execlib, applib, templatelib, htmltemplatelib);
  require('./prepreprocessors')(execlib, applib, templatelib, htmltemplatelib);


})(ALLEX)

},{"./modifiers":2,"./prepreprocessors":4}],2:[function(require,module,exports){
function createModifiers (execlib, applib, templatelib, htmltemplatelib) {
  'use strict';

  require('./logoutcreator')(execlib, applib, templatelib, htmltemplatelib);

}

module.exports = createModifiers;

},{"./logoutcreator":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
function createPrePreprocessors (execlib, applib, templatelib, htmltemplatelib) {
  'use strict';

  require('./logoutmechanicscreator')(execlib, applib, templatelib, htmltemplatelib);
}

module.exports = createPrePreprocessors;


},{"./logoutmechanicscreator":5}],5:[function(require,module,exports){
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

},{}]},{},[1]);
