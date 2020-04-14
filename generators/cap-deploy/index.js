'use strict';
const Generator = require('yeoman-generator');
// const Parser = require('ts-simple-ast').default;
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

    /*const tsParser = new Parser();
    tsParser.addExistingSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/package.json` : 'package.json'
      )
    );
    const file = tsParser.getSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/package.json` : 'package.json'
      )
    );
    const devDependencies = /"dependencies": {/g;
    const e2e = /"build": "ng build",/g;
    const scriptStart = /"start": "ng serve",/g;

    const newText = file
      .getText()
      .replace(
        devDependencies,
        `  "engines": {
    "node": "~12.14.1",
    "npm": "~6.13.6"
  },
  "dependencies": {
    "typescript": "~3.5.3",
    `
      )
      .replace(
        e2e, this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run config && npm run build:ssr",`
        : `"build": "ng build",
    "postinstall": "npm run config && ng build --aot --prod",`
      )
      .replace(scriptStart, this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"start": "npm run config && npm run serve:ssr",
    "config": "node set-env.ts",`
        : `"start": "npm run config && node server.js",
    "config": "node set-env.ts",`);

    file.removeText(file.getPos(), file.getEnd());
    file.insertText(0, newText);
    file.saveSync();
*/


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
    "typescript": "~3.5.3",`
    );

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"build": "ng build",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run config && npm run build:ssr",`
        : `"postinstall": "npm run config && ng build --aot --prod",`
    );

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-ssr')
        ?`"start": "npm run config && npm run serve:ssr",
    "config": "node set-env.ts",`
        : `"start": "npm run config && node server.js",
    "config": "node set-env.ts",`
    );


    await ts_ast.astFiles(
      this.destinationPath( this.options.name
        ? `${this.options.name}/src/environments/environment.ts`
        : 'src/environments/environment.ts'),
      `export const environment = {`,
      this.options.credentials.authService === 'auth0'
        ? `export const environment = {
  clientId: '',
  clientSecret: '',
  domain: '',`
        : `export const environment = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''`);
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
