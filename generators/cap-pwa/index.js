'use strict';
const Generator = require('yeoman-generator');
const ts_ast = require('../app/utils/AST-files');

// const chalk = require('chalk');
// const { exec, spawn } = require('promisify-child-process');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for PWA MODULE
   * @returns
   */
  /*prompting() {
    this.log(`=========================================\nNow lets configure the ${chalk.blue('PWA MODULE')}\n==========================================`);

    const prompts = [
      {
        type: 'checkbox',
        name: 'services',
        message: 'Select the modules you want to include:',
        choices: [
          {
            name: 'PWA-Shell',
            value: {
              name: 'shell',
            },
            short: 'CAP Shell'
          },
          {
            name: 'PWA-WebPush',
            value: {
              name: 'webPush',
            },
            short: 'CAP Shell'
          }
        ],
      },
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }*/

  async install() {

    this.spawnCommandSync(
      'ng',
      [
        'add',
        `@angular/pwa@${this.options.env.options.pwa.pwaPackageVersion}`
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );

    this.spawnCommandSync(
      'ng',
      [
        'add',
        `@nguniversal/express-engine@${this.options.env.options.pwa.ngUniversalVersion}`,
        '--clientProject',
        this.options.name
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );

    // if (this.props.services.find(x => x.name === 'shell')) {
    if (true) {
      this.spawnCommandSync(
        'ng',
        [
          'generate',
          `@schematics/angular:appShell`,
          '--clientProject',
          this.options.name,
          '--universalProject',
          this.options.name + '-universal'
        ],
        {
          cwd:  this.destinationPath(this.options.name)
        }
      );
    }

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      this.options.modules.find(x => x.name === 'cap-pwa')
        ? `"postinstall": "npm run config",`
        : `"build": "ng build",`
        ,this.options.modules.find(x => x.name === 'cap-pwa')
        ? `"postinstall": "npm run config && npm run build:ssr",`
        : `"postinstall": "npm run build:ssr",`
    );

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/package.json`
        : 'package.json'),
      this.options.modules.find(x => x.name === 'cap-pwa')
        ? `"start": "npm run config",`
        : `"start": "ng serve",`,
      this.options.modules.find(x => x.name === 'cap-pwa')
        ? `"start": "npm run config && npm run serve:ssr",`
        : `"start": "npm run config && node server.js",`
    );

    /*if (this.props.services.find(x => x.name === 'webPush')) {
      this.spawnCommandSync(
        'npm',
        [
          'install',
          'web-push',
          '-g'
        ],
        {
          cwd:  this.destinationPath(this.options.name)
        }
      );
      // Add Schematics-Webpush
      let keys = await exec('web-push generate-vapid-keys --json');
      let keysStdout = JSON.parse(keys.stdout)
      this.spawnCommandSync(
        'ng',
        [
          'add',
          'cap-angular-schematic-webpush'
          ,this.options.name,
          'http://localhost:4000',
          keysStdout.publicKey,
          keysStdout.privateKey
        ],
        {
          cwd:  this.destinationPath(this.options.name)
        }
      );
    }*/
  }
}
