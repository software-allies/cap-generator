'use strict';
const Generator = require('yeoman-generator');
const Parser = require('ts-simple-ast').default;

module.exports = class extends Generator {
  writing() {
    const path = this.destinationPath(this.options.name).split('/')
    this.fs.copyTpl(this.templatePath(), this.destinationPath(this.options.name), {
      appName: this.options.name ? this.options.name : path[path.length - 1]
    });

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
    const e2e = /"e2e": "ng e2e"/g;
    const scriptStart = /"start": "/g;

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
        e2e,
        `"e2e": "ng e2e",
    "postinstall": "ng build --aot --prod"`
      )
      .replace(scriptStart, `"start": "node server.js && `);

    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values
    file.insertText(0, newText); // Insert new text
    file.saveSync(); // Save all changes
  }

  install() {
    this.spawnCommandSync('npm', ['install', '--save', 'express', 'path'], {
      cwd: this.destinationPath(this.options.name)
    });
  }
};
