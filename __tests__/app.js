'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-cap:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      app: {
        type: 'api'
      }
    });
  });

  it('creates files', () => {
    assert.file(['package.json']);
  });
});
