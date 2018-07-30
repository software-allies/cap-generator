'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('cap-auth-module/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`), {
        name: this.options.name
      }
    );

  }
}