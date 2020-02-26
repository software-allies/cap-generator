'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for PWA MODULE
   * @returns
   */
  prompting() {
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
  }

  install() {
    this.spawnCommandSync(
      'ng',
      [
        'add',
        '@angular/pwa',
        '--clientProject',
        this.options.appName
      ],
      {
        cwd:  this.destinationPath(this.options.name)
      }
    );
    if (this.props.services.find(x => x.name === 'shell')) {
      this.spawnCommandSync(
        'ng',
        [
          'generate',
          '@schematics/angular:appShell',
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
    if (this.props.services.find(x => x.name === 'webPush')) {
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
    }
  }
}
