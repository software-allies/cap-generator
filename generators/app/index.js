'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const newApplication = require('../../utils/new-application');
const existingApplication = require('../../utils/existing-application');

module.exports = class extends Generator {
  /**
   * @description Prompts all the question to the user so we can know what type of app the user wants to create
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`${chalk.red('CAP Generator\n Build amazing apps faster and better')}`)
    );

    const prompts = [
      {
        type: 'list',
        name: 'projecttype',
        message: 'Do you want to create a new application or modify an existing one?',
        choices: [
          {
            name: `Create a new Angular application.`,
            value: 'create'
          },
          {
            name: `Modify an angular application.`,
            value: 'modify'
          }
        ]
      },
      {
        type: 'input',
        name: 'appName',
        message: 'What\'s the name of your application?',
        default: this.appname,
        when: ctx => ctx.projecttype === 'create'
      },
      {
        type: 'list',
        name: 'authService',
        message: 'Choose an authentication service',
        when: ctx => ctx.projecttype === 'create',
        choices: [
          {
            name: `Auth0`,
            value: 'auth0'
          },
          {
            name: `Firebase`,
            value: 'firebase'
          }
        ]
      },
      {
        type: 'input',
        name: 'deploy',
        message: `Do you want to deploy your application in Heroku? [y/n]`,
        default: 'n',
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include:',
        choices: newApplication,
        when: ctx => ctx.projecttype === 'create'
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include:',
        choices: existingApplication,
        when: ctx => ctx.projecttype === 'modify'
      },
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * @description Create the app based on the user answer, and update the template to include the values from the user inputs
   * @author Lenin Emmanuel Espinoza <lenin_emmanuel@sofwareallies.com>
   * @returns
   */
  writing() {

    function yesNoValidation (value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }

    if (yesNoValidation(this.props.deploy)) {
      this.props.modules.push({name:'cap-deploy'});
    }
  }

  install() {
    if (this.props.projecttype === 'create') {

      this.spawnCommandSync('ng', ['new', this.props.appName, '--routing', '--style', 'css']);

      if (this.props.authService === 'auth0') {
        this.spawnCommandSync('ng',['add', 'cap-angular-schematic-auth-auth0'], {cwd:this.destinationPath(this.props.appName)});
      } else  if (this.props.authService === 'firebase') {
        this.spawnCommandSync('ng', ['add', 'cap-angular-schematic-auth-firebase'], {cwd:this.destinationPath(this.props.appName)});
      }

      this.spawnCommandSync('ng', ['add', 'cap-angular-schematic-responsive', this.props.appName, 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png', true], {cwd: this.destinationPath(this.props.appName)});
    }
  }

  /**
   * @description Install dependencies and show next steps
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  end() {
    // Call the subgenerator for each module the user selected
    if (this.props.modules && this.props.modules.length) {
      this.props.modules.forEach(m => {
        this.composeWith(require.resolve(`../${m.name}`), {
          name: this.props.appName ? this.props.appName : ''
        });
      });
    } else {
      // this.log(yosay(chalk.bgGreen('Happy coding')));
    }
  }
};
