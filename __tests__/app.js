'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('[API] - generator-cap:app', () => {
  this.files = [
    'test/server',
    'test/server/boot',
    'test/server/boot/authentication.js',
    'test/server/boot/root.js',
    'test/server/component-config.json',
    'test/server/config.json',
    'test/server/datasources.json',
    'test/server/middleware.development.json',
    'test/server/middleware.json',
    'test/server/model-config.json',
    'test/package.json',
    'test/README.md'
  ]

  beforeAll(() => {
    const answers = {
      type: 'api',
      name: 'test',
      modules: []
    }
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);
  });

  it('Should create all the files needed for the API', () => {
    assert.file(this.files);
  });
});
