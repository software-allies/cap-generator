'use strict';
const Generator = require('yeoman-generator');
const Parser = require('ts-simple-ast').default;
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    this.log(`=========================================\n
    Now lets configure the ${chalk.blue('HEROKU CONNECT MODULE')}
    \n==========================================`);
    const prompts = [
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const path = this.destinationPath(this.options.name).split('/')
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(this.options.name),
      {
        appName: this.options.name ? this.options.name: path[path.length-1]
      }
    );

    const tsParser = new Parser();

    console.log(this.destinationPath(this.options.name ? `${this.options.name}/package.json`: 'package.json'));

    tsParser.addExistingSourceFile(this.destinationPath(this.options.name ? `${this.options.name}/package.json`: 'package.json'));
    const file = tsParser.getSourceFile(this.destinationPath(this.options.name ? `${this.options.name}/package.json`: 'package.json'));
    const devDependencies= /"devDependencies": {/g;
    const e2e = /"e2e": "ng e2e"/g;
    const scriptStart = /"start": "/g

    const newText = file.getText().replace(devDependencies, `  "engines": {
    "node": "~12.14.1",
    "npm": "~6.13.6"
  },
  "devDependencies": {`)
    .replace(e2e, `"e2e": "ng e2e",
    "postinstall": "ng build --aot --prod"`)
    .replace(scriptStart, `"start": "node server.js && `);

    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values
    file.insertText(0, newText); // Insert new text
    file.saveSync(); // Save all changes

  }

  install() {
    const herokuApp = this.options.name ?
      (this.options.name).replace(/ /g, "-").toLowerCase() + '-' + Date.now() :
      this.determineAppname().replace(/ /g, "-").toLowerCase() + '-' + Date.now();

    //  install express and path to setup our server.
    this.spawnCommandSync('npm', ['install', '--save', 'express', 'path'], {cwd:this.destinationPath(this.options.name)});

    this.spawnCommandSync('heroku', ['apps:create', herokuApp]);
    this.spawnCommandSync('git', ['init'], {cwd: this.destinationPath(this.options.name)});
    this.spawnCommandSync('git', ['add', '.'], {cwd: this.destinationPath(this.options.name)});
    this.spawnCommandSync('git', ['commit', '-m', `"First commit"`], {cwd:this.destinationPath(this.options.name)});
    this.spawnCommandSync('git', ['remote', '-v'], {cwd:this.destinationPath(this.options.name)});
    this.spawnCommandSync('heroku', ['git:remote', '-a', herokuApp], {cwd:this.destinationPath(this.options.name)});
    this.spawnCommandSync('git', ['push', 'heroku', 'master'], {cwd:this.destinationPath(this.options.name)});
  }

  end() {
    console.log('cap-deploy-end');
  }
}
