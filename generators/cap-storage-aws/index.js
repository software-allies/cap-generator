'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  initializing() {
    console.log(this.options)
  }

  prompting() {
    // Here we'll ask the user for the configuration regarding to this subgenerator
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('cap-storage-aws/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`), {
        name: this.options.name
      }
    );
  }
}