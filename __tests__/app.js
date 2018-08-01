'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const apiFixtures = require('./fixtures/api.fixtures')

describe('[API] - generator-cap:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(apiFixtures);
  });

  it('creates files', () => {
    assert.file([`${apiFixtures.app.name}/package.json`]);
  });
});
