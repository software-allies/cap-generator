'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('[API] - generator-cap:app', () => {
  this.files = [
    'test/server',
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

  it('creates files', () => {
    assert.file(this.files);
  });
});
