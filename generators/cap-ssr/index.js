'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
    /**
   * @description Ask the user the configuration information for SSR MODULE
   * @returns
   */
  install() {
    this.log(`=========================================\nNow lets configure the ${chalk.blue('SSR MODULE')}\n==========================================`);

    this.spawnCommandSync(
      'ng',
      [
        'add',
        '@nguniversal/express-engine',
        '--clientProject', this.options.name
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );
  }
}
