'use strict';
const Generator = require('yeoman-generator');
const { exec } = require('promisify-child-process');
const ts_ast = require('../app/utils/AST-files');

module.exports = class extends Generator {

  async writing() {
    await ts_ast.astFunctions.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"dependencies": {`,
      `"engines": {
    "node": "${this.options.env.options.deploy.node}",
    "npm": "${this.options.env.options.deploy.npm}"
  },
  "dependencies": {
    "typescript": "${this.options.env.options.deploy.typescript}",`
    );

    await ts_ast.astFunctions.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"build": "ng build",`,
      this.options.modules.find(x => x.name === 'cap-ssr' || x.name === 'cap-pwa')
      // this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run config",`
        : `"postinstall": "npm run config && ng build --aot --prod",`
    );

    await ts_ast.astFunctions.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-ssr' || x.name === 'cap-pwa')
      // this.options.modules.find(x => x.name === 'cap-ssr')
        ?`"start": "npm run config",
    "config": "node set-env.ts",`
        : `"start": "npm run config && node server.js",
    "config": "node set-env.ts",`
    );
  }

  install() {
    this.options.env.arguments.map(async x => {
      await exec(`heroku config:set ${x.key}=${x.value} --app=${this.options.angularHerokuApp}`);
    });
    if (this.options.deployFrontEnd && !(this.options.modules.find(x => x.name === 'cap-heroku-connect'))) {
      // this.spawnCommandSync('heroku', ['apps:create', this.options.angularHerokuApp]);
      this.spawnCommandSync('git', ['init'], {cwd: this.destinationPath(this.options.name)});
      this.spawnCommandSync('git', ['add', '.'], {cwd: this.destinationPath(this.options.name)});
      this.spawnCommandSync('git', ['commit', '-m', `"First commit"`], {cwd:this.destinationPath(this.options.name)});
      this.spawnCommandSync('git', ['remote', '-v'], {cwd:this.destinationPath(this.options.name)});
      this.spawnCommandSync('heroku', ['git:remote', '-a', this.options.angularHerokuApp], {cwd:this.destinationPath(this.options.name)});
      this.spawnCommandSync('git', ['push', 'heroku', 'master'], {cwd:this.destinationPath(this.options.name)});
    }
  }
};
