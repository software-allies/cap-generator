'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const clientPackages = require('../../utils/client-packages');
const Parser = require('ts-simple-ast').default;

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
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include:',
        choices: clientPackages,
      },
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
    const modules = {}
    modules['packages'] = []
    // Create an array of string with format: ['"package": "0.0.1"', '"package2": "0.0.1"', ...] so we can join it to write it to templates/client/package.json
    if (this.props.modules.length) {
      modules['packages'] = this.props.modules.map( (m, i) => {
          return `"${m.name}": "${m.version}"${i + 1 === this.props.modules.length ? '' : ','}`      // Original
      });
      modules['imports'] = {
        auth: this.props.modules.findIndex( m => m.name === 'cap-authorization') >= 0,
        awsStorage: this.props.modules.findIndex( m => m.name === 'cap-storage-aws') >= 0,
        liveChat: this.props.modules.findIndex(m => m.name === 'cap-live-chat' )>= 0,
        herokuConnect: this.props.modules.findIndex(m => m.name === 'cap-heroku-connect' )>= 0
      }
    }
  }

  install() {
    if (this.props.projecttype === 'create') {
      this.spawnCommandSync('ng', ['new', this.props.appName, '--routing', '--style', 'css']);
      this.spawnCommandSync('ng', ['add', '@ng-bootstrap/schematics'], {cwd: this.destinationPath(this.props.appName)});
      const appComponent = new Parser();
      appComponent.addExistingSourceFile(this.destinationPath(`${this.props.appName}/src/app/app.component.html`));
      const fileComponent = appComponent.getSourceFile(this.destinationPath(`${this.props.appName}/src/app/app.component.html`))
      fileComponent.removeText(fileComponent.getPos(), fileComponent.getEnd());
      fileComponent.insertText(0, '<router-outlet></router-outlet>');
      fileComponent.saveSync();
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
          name: this.props.appName ? this.props.appName : '',
        });
      });
    } else {
      // this.log(yosay(chalk.bgGreen('Happy coding')));
    }
  }
};
