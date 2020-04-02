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
        name: 'authService',
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
      },
      {
        type: 'input',
        name: 'AUTH0_CLIENT_ID',
        message: 'Set your Auth0 Client ID: ',
        default: '',
        when: ctx => ctx.authService === 'auth0'
      },
      {
        type: 'input',
        name: 'AUTH0_CLIENT_SECRET',
        message: 'Set your Auth0 Client Secret: ',
        default: '',
        when: ctx => ctx.authService === 'auth0'
      },
      {
        type: 'input',
        name: 'AUTH0_DOMAIN',
        message: 'Set your Auth0 Domain: ',
        default: '',
        when: ctx => ctx.authService === 'auth0'
      },


      {
        type: 'input',
        name: 'apiKey',
        message: 'Set your ApiKey: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'authDomain',
        message: 'Set your Auth Domain: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'databaseURL',
        message: 'Set your data base URL: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'projectId',
        message: 'Set your Project ID: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'storageBucket',
        message: 'Set your storage bucket: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'senderId',
        message: 'Set your message sender ID: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'appId',
        message: 'Set your app ID: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
      {
        type: 'input',
        name: 'measurementId',
        message: 'Set your measurement ID: ',
        default: '',
        when: ctx => ctx.authService === 'firebase'
      },
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
    // this.log(`${chalk.bgGreen('Installing Authentication Module')}`);

    if (this.props.authService === 'auth0'){

      this.spawnCommandSync(
        'ng',
        [
          'add',
          'cap-angular-schematic-auth-auth0',
          `--clientID=${this.props.AUTH0_CLIENT_ID}`,
          `--clientSecret=${this.props.AUTH0_CLIENT_SECRET}`,
          `--domain=${this.props.AUTH0_DOMAIN}`,
          `--endPoint=`
        ],
        {
          cwd:this.destinationPath(this.options.name)
        }
      );

    } else if (this.props.authService = 'firebase'){

      this.spawnCommandSync(
        'ng',
        [
          'add',
          'cap-angular-schematic-auth-firebase@latest',
          `--apiKey=${this.props.apiKey}`,
          `--authDomain=${this.props.authDomain}`,
          `--databaseURL=${this.props.databaseURL}`,
          `--projectId=${this.props.projectId}`,
          `--storageBucket=${this.props.storageBucket}`,
          `--senderId=${this.props.senderId}`,
          `--appId=${this.props.appId}`,
          `--measurementId=${this.props.measurementId}`
        ],
        {
          cwd:this.destinationPath(this.options.name)
        }
      );
    }
  }
}
