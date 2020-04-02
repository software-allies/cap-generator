'use strict';
const Generator = require('yeoman-generator');
const Parser = require('ts-simple-ast').default;
const { exec, spawn } = require('promisify-child-process');

module.exports = class extends Generator {
  writing() {

    const path = this.destinationPath(this.options.name).split('/')

    this.fs.copyTpl(
      this.templatePath('server/**'),
      this.destinationPath(this.options.name),
      {
        appName: this.options.name ? this.options.name : path[path.length - 1]
      }
    );

    this.fs.copyTpl(
      this.templatePath('env/**'),
      this.destinationPath(this.options.name),
      {}
    )

    const tsParser = new Parser();
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
    const devDependencies = /"devDependencies": {/g;
    const e2e = /"build": "ng build",/g;
    const scriptStart = /"start": "ng serve"/g;

    const newText = file
      .getText()
      .replace(
        devDependencies,
        `  "engines": {
    "node": "~12.14.1",
    "npm": "~6.13.6"
  },
  "devDependencies": {`
      )
      .replace(
        e2e, this.options.modules.find(x => x.name === 'cap-ssr')
        ? `"postinstall": "npm run build:ssr",`
        : `"build": "ng build",
    "postinstall": "ng build --aot --prod",`
      )
      .replace(scriptStart, this.options.modules.find(x => x.name === 'cap-ssr') ? `"start": "npm run serve:ssr"` : `"start": "node server.js"`);

    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values
    file.insertText(0, newText); // Insert new text
    file.saveSync(); // Save all changes
  }

  async install(){
    const auth_env = this.options.env.arguments;
    auth_env.map( async x => {
       await exec(`heroku config:set ${x.variable}=${x.key} --app=${this.options.angularHerokuApp}`);
    });

    this.spawnCommandSync('npm', ['install', '--save', 'express', 'path'], {
      cwd: this.destinationPath(this.options.name)
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
