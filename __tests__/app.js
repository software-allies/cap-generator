'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('[API] - generator-cap:app', () => {
  const answers = {
    app: {
      type: 'api',
      name: 'testsing'
    },
    client: {
      modules: []
    }
  }
  this.filePath = path.resolve('package.json');

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);
  });

  it('creates files', () => {
    assert.file([this.filePath]);
  });
});
