'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const clientPackages = require('../../utils/client-packages');
const getCAPAwsPrompts = require('../../utils/cap-storage-aws-prompts');
const getCAPAuthPrompts = require('../../utils/cap-auth-module-prompts');

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
        name: 'type',
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
        type: 'input',
        name: 'name',
        message: 'What\'s the name of your application?',
        default: this.appname
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include:',
        choices: clientPackages,
        when: ctx => ctx.type === 'client'
      },
      ...getCAPAwsPrompts, // TODO: We should think about moving this to its own subgenerator but somehow *UPDATE* the App Module to include the different imports and configuration
      ...getCAPAuthPrompts // TODO: We should think about moving this to its own subgenerator but somehow *UPDATE* the App Module to include the different imports and configuration
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * @description Create the app based on the user answer, and update the template to include the values from the user inputs
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  writing() {
    switch (this.props.type) {
      case 'api': {
        this.fs.copyTpl(
          this.templatePath('api/**'),
          this.destinationPath(this.props.name)
        );
        break;
      }
      case 'client': {
        const modules = {}
        modules['packages'] = []

        // Create an array of string with format: ['"package": "0.0.1"', '"package2": "0.0.1"', ...] so we can join it to write it to templates/client/package.json
        if (this.props.modules.length) {
          modules['packages'] = this.props.modules.map( (m, i) => {
            return `"${m.name}": "${m.version}"${i + 1 === this.props.modules.length ? '' : ','}`
          });
          modules['imports'] = {
            auth: this.props.modules.findIndex( m => m.name === 'cap-authorization') >= 0,
            awsStorage: this.props.modules.findIndex( m => m.name === 'cap-storage-aws') >= 0
          }
        }

        // Copy template
        this.fs.copyTpl(
          this.templatePath('client/**'),
          this.destinationPath(this.props.name), {
            name: this.props.name,
            deps: modules.packages.join('\n\t\t'),
            imports: modules.imports,
            aws: {
              bucket: this.props.awsBucket,
              accessKeyId: this.props.awsAccessKeyId,
              secretAccessKey: this.props.awsSecretAccessKey,
              region: this.props.awsRegion,
              folder: this.props.awsFolder
            },
            auth: {
              apiUrl: this.props.authApiUrl,
              loginEndPoint: this.props.authLoginEndPoint
            }
          }
        );

        // Call the subgenerator for each module the user selected
        this.props.modules.forEach(m => {
          this.composeWith(require.resolve(`../${m.name}`), {
            name: this.props.name
          });
        });
        break;
      }
      // No default
    }
  }

  /**
   * @description Install dependencies and show next steps
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  end() {
    this.log(yosay(chalk.bgGreen('Happy coding')));
    this.log(
      `Next steps: \n cd ${chalk.blue(`${this.props.name}`)} \n\n ${chalk.blue(
        'npm install'
      )} \n\n ${chalk.blue('npm start')}`
    );
  }
};
