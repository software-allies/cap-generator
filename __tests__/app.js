'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('[API] - generator-cap:app', () => {
  const files = [
    'apiTest/server',
    'apiTest/server/boot',
    'apiTest/server/boot/authentication.js',
    'apiTest/server/boot/root.js',
    'apiTest/server/component-config.json',
    'apiTest/server/config.json',
    'apiTest/server/datasources.json',
    'apiTest/server/middleware.development.json',
    'apiTest/server/middleware.json',
    'apiTest/server/model-config.json',
    'apiTest/package.json',
    'apiTest/README.md'
  ]

  beforeAll(() => {
    const answers = {
      type: 'api',
      name: 'apiTest',
      modules: []
    }
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);
  });

  it('Should create all the files needed for the API', () => {
    assert.file(files);
  });
});

describe('[CLIENT] - generator-cap:app', () => {
  const files = [
    'clientTest/resources',
    'clientTest/resources/android',
    'clientTest/resources/ios',
    'clientTest/resources/icon.png',
    'clientTest/resources/README.md',
    'clientTest/resources/splash.png',
    'clientTest/src',
    'clientTest/src/app',
    'clientTest/src/assets',
    'clientTest/src/pages',
    'clientTest/src/theme',
    'clientTest/src/index.html',
    'clientTest/src/manifest.json',
    'clientTest/src/service-worker.js',
    'clientTest/config.xml',
    'clientTest/ionic.config.json',
    'clientTest/package.json',
    'clientTest/tsconfig.json',
    'clientTest/tslint.json'
  ]

  beforeAll(() => {
    const answers = {
      type: 'client',
      name: 'clientTest',
      modules: []
    }
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);
  });

  it('Should create all the files needed for the CLIENT app without extra modules', () => {
    assert.file(files);
  });
});
