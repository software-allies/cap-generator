'use strict';
const Generator = require('yeoman-generator');
const { exec, spawn } = require('promisify-child-process');
const ts_ast = require('../../utils/AST-files');

module.exports = class extends Generator {
  async writing() {

    const path = this.destinationPath(this.options.name).split('/')

    if (!(this.options.modules.find(x => x.name === 'cap-ssr'))) {
      this.fs.copyTpl(
        this.templatePath('server/**'),
        this.destinationPath(this.options.name),
        {
          appName: this.options.name ? this.options.name : path[path.length - 1]
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('env/**'),
      this.destinationPath(this.options.name),
      {
        modules: this.options.modules,
        auth: this.options.credentials.authService
      }
    );

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"dependencies": {`,
      `"engines": {
    "node": "~12.14.1",
    "npm": "~6.13.6"
  },
  "dependencies": {
    "typescript": "^3.6.4",`
    );

    /*await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"build": "ng build",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run config && npm run build:ssr",`
        : `"postinstall": "npm run config && ng build --aot --prod",`
    );*/

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"build": "ng build",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run config",`
        : `"postinstall": "npm run config && ng build --aot --prod",`
    );

    /*await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ?`"start": "npm run config && npm run serve:ssr",
    "config": "node set-env.ts",`
        : `"start": "npm run config && node server.js",
    "config": "node set-env.ts",`
    );*/

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ?`"start": "npm run config",
    "config": "node set-env.ts",`
        : `"start": "npm run config && node server.js",
    "config": "node set-env.ts",`
    );

  }

  install(){
    this.options.env.arguments.map( async x => {
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
