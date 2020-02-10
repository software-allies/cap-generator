'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {

   /**
   * @description Ask the user the configuration information for AUTH MODULE
   * @author Lenin Emmanuel Espinoza <lenin_emmanuel@sofwareallies.com>
   * @returns
   */
  prompting() {
    // Have Yeoman greet the user.
    this.log(`=========================================\nNow lets configure the ${chalk.blue('AUTH MODULE')}\n==========================================
    `);
    const prompts = [
      {
        type: 'list',
        name: 'modules',
        message: 'Select the service you want to use to authenticate users:',
        choices: [
          {
            name: `Firebase`,
            value: 'firebase'
          },
          {
            name: `Auth0`,
            value: 'auth0'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

   /**
   * @description Once we get the information update the module to include the configuration.
   * @author Lenin Emmanuel Espinoza <lenin_emmanuel@sofwareallies.com>
   * @returns
   */
  writing() {}

  install() {
    this.log(`${chalk.bgGreen('Installing Authentication Module')}`);
    if (this.props.modules === 'auth0'){
      this.spawnCommandSync('npm', ['i', '-g', 'cap-angular-schematic-auth-auth0']);

      this.spawnCommandSync('ng',['g', 'cap-angular-schematic-auth-auth0:cap-angular-schematic-auth-auth0'], {cwd:this.destinationPath(this.options.name)});

    } else if (this.props.modules = 'firebase'){

      this.spawnCommandSync('npm', ['i', '-g', 'cap-angular-schematic-auth-firebase']);

      this.spawnCommandSync('ng', ['g', 'cap-angular-schematic-auth-firebase:cap-angular-schematic-auth-firebase'], {cwd:this.destinationPath(this.options.name)});
    }
  }
}
