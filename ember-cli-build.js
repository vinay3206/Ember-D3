/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    },
    sassOptions: {
      extension: 'scss'
    }
  });

  app.import('bower_components/d3/d3.js');
  return app.toTree();
};
