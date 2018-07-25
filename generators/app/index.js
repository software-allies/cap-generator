'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const clientPackages = require('../../utils/client-packages')

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`${chalk.red('CAP Generator\n Build amazing apps faster and better')}`)
    );

    const prompts = [
      {
        type: 'list',
        name: 'app.type',
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
        name: 'app.name',
        message: 'What\'s the name of your application?',
        default : this.appname
      },
      {
        type: 'checkbox',
        name: 'client.modules',
        message: 'Select the modules you want to include: ',
        choices: clientPackages,
        when: (ctx) => ctx.app.type === 'client'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    switch (this.props.app.type) {
      case 'api':
        this.fs.copyTpl(
          this.templatePath('api/**'),
          this.destinationPath(this.props.app.name)
        );
        break;
    
      case 'client':
        const modules = this.props.client.modules.map( (m, i) => {
          return `"${m.name}": "${m.version}"${i + 1 === this.props.client.modules.length ? '' : ','}`
        });
      
        this.fs.copyTpl(
          this.templatePath('client/**'),
          this.destinationPath(this.props.app.name), {
            name: this.props.app.name,
            deps: modules.join('\n\t\t')
          }
        );
        break;
      
      // No default
    }
    
  }

  end() {
    this.log(yosay(chalk.bgGreen('Happy coding')))
    this.log(`Next steps: \n cd ${chalk.blue(`${this.props.app.name}`)} \n\n ${chalk.blue('npm install')} \n\n ${chalk.blue('npm start')}`)
  }
};
