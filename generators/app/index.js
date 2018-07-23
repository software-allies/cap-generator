'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`${chalk.red('Connected Apps Platform Generartor\n Build amazing apps faster and better')}`)
    );

    const prompts = [
      {
        type: 'list',
        name: 'appType',
        message: 'What type of app are you going to build?',
        choices: [
          {
            name: `api (Using ${chalk.red('Loopback')})`,
            value: 'api'
          },
          {
            name: `client (Using ${chalk.red('Ionic')})`,
            value: 'client'
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'client.modules',
        message: 'Select the modules you want to include',
        choices: [
          {
            name: 'ionic-auth-module',
            value: 'ionoic-auth',
            short: 'Ionic Auth Module'
          },
          {
            name: 'ionic-storage',
            value: 'ionoic-storage',
            short: 'Ionic Storage Module'
          } 
        ],
        when: (ctx) => ctx.appType === 'client'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      console.log('this.props', this.props)
    });
  }
};
