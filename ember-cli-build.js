'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
const exampleAssetHost = 'http://localhost:4211';
const embroiderBuild = false;

if (embroiderBuild) {
  module.exports = function (defaults) {
    const app = new EmberApp(defaults, {});

    return require('@embroider/compat').compatBuild(app, Webpack);
  };
} else {
  module.exports = function (defaults) {
    const app = new EmberApp(defaults, {
      fingerprint: {
        enabled: true,
        exclude: ['testem.js'],
        extensions: ['js', 'json', 'css'],
        prepend: `${exampleAssetHost}/`,
        generateAssetMap: true,
        fingerprintAssetMap: true,
      },
    });

    return app.toTree();
  };
}
