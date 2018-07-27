'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('cap-storage-aws/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`),
      {
        name: this.options.name
      }
    );
  }
};
