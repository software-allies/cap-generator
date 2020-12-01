'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const ts_ast = require('../app/utils/AST-files');

module.exports = class extends Generator {
    /**
   * @description Ask the user the configuration information for SSR MODULE
   * @returns
   */
   async install() {
    this.log(`=========================================\nNow lets configure the ${chalk.blue('SSR MODULE')}\n==========================================`);

    this.spawnCommandSync(
      'ng',
      [
        'add',
        '@nguniversal/express-engine',
        '--clientProject',
        this.options.name
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );

    /*this.spawnCommandSync(
      'ng',
      [
        'add',
        'cap-angular-schematic-ssr@latest'
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );*/

    await ts_ast.astFunctions.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      this.options.modules.find(x => x.name === 'cap-deploy')
        ? `"postinstall": "npm run config",`
        : `"build": "ng build",`
        ,this.options.modules.find(x => x.name === 'cap-deploy')
        ? `"postinstall": "npm run config && npm run build:ssr",`
        : `"postinstall": "npm run build:ssr",`
    );

    await ts_ast.astFunctions.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      this.options.modules.find(x => x.name === 'cap-deploy')
        ? `"start": "npm run config",`
        : `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-deploy')
      ? `"start": "npm run config && npm run serve:ssr",`
      : `"start": "npm run config && node server.js",`
    );
  }
}
