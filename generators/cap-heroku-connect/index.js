'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
var exec = require('child-process-promise').exec;
const HerokuConnect = require('./heroku-connect');
const herokuDeploy = require('./heroku-deploy');
const loopback = require('./loopback-build');
const loopbackConfig = require('./loopback-configuration');
const firebaseJwt = require('./firebase-jwt');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for Heroku Connect
   * @author leninEmmanuel <lenin_emmanuel@softwareallies.com>
   * @returns
   */

  prompting() {
    this.log(`=========================================\n
    Now lets configure the ${chalk.blue('HEROKU CONNECT MODULE')}
    \n==========================================`);
    const prompts = [
      {
        type: 'list',
        name: 'sync',
        message: 'Choose a data synchronizer model',
        choices: [
          {
            name: `HerokuConnect`,
            value: 'HerokuConnect'
          },
          {
            name: `CustomSync`,
            value: 'CustomSync'
          }
        ]
      },
      {
        type: 'input',
        name: 'path',
        message: "What's the name of your API?",
        default: `${this.options.name}-api`,
        when: ctx => ctx.sync === 'HerokuConnect'
      },
      {
        type: 'input',
        name: 'deploy',
        message: `Do you want to deploy on Heroku? [y/n]`,
        default: 'n',
        when: ctx => ctx.sync === 'HerokuConnect'
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  /**
   * @description Once we get the information update the module to include the configuration.
   * @author leninEmmanuel <lenin_emmanuel@sofwareallies.com>
   * @returns
   */

  writing() {
    function yesNoValidation(value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }

    // eslint-disable-next-line default-case
    switch (this.props.sync) {
      case 'CustomSync':
        console.log('We are working on it');
        break;

      case 'HerokuConnect':
        exec('lb --version', async error => {
          if (error) {
            console.log(
              'error: you dont have loopback installed, wait a moment we will proceed to install loopback'
            );
            await loopback.loopbackCLI(this.props.path, true);
          } else {
            await loopback.loopbackCLI(this.props.path, false);
          }

          let urlDataBase = await HerokuConnect.herokuCLI(
            this.props.path,
            this.templatePath('cap-heroku-connect-api/mapping')
          );
          // Console.log('urlDataBase: ', urlDataBase);

          this.fs.copyTpl(
            this.templatePath('cap-heroku-connect-api/models/**'),
            this.destinationPath(`${this.props.path}`),
            {}
          );

          let jkws = this.options.credentials.authService === 'firebase'
            ? await firebaseJwt.getGoogleCredentials(
                this.options.credentials.projectId
              )
            : null;

          this.fs.copyTpl(
            this.templatePath('cap-heroku-connect-api/auth/**'),
            this.destinationPath(`${this.props.path}/server/`),
            {
              audience:
                this.options.credentials.authService === 'auth0'
                  ? `${this.options.credentials.AUTH0_DOMAIN}/api/v2/`
                  : this.options.credentials.projectId,
              issuer:
                this.options.credentials.authService === 'auth0'
                  ? this.options.credentials.AUTH0_DOMAIN
                  : `https://securetoken.google.com/${
                      this.options.credentials.projectId
                    }`,
              jwksUri:
                this.options.credentials.authService === 'auth0'
                  ? `${this.options.credentials.AUTH0_DOMAIN}/.well-known/jwks.json`
                  : `https://${
                      this.options.credentials.projectId
                    }.firebaseio.com/jwks/${jkws}.json`
            }
          );

          await loopbackConfig.loopbackConfiguration(
            this.props.path,
            this.destinationPath(`${this.props.path}`),
            urlDataBase ? urlDataBase.postgresURL : ''
          );

          if (yesNoValidation(this.props.deploy)) {
            await herokuDeploy.herokuCLI(
              this.props.path,
              urlDataBase ? urlDataBase.appName : ''
            );
          }

          if (this.options.auth) {
            if (this.options.credentials.authService === 'auth0') {
              this.spawnCommandSync(
                'ng',
                [
                  'add',
                  'cap-angular-schematic-auth-auth0',
                  `--clientID=${this.options.credentials.AUTH0_CLIENT_ID}`,
                  `--clientSecret=${this.options.credentials.AUTH0_CLIENT_SECRET}`,
                  `--domain=${this.options.credentials.AUTH0_DOMAIN}`,
                  yesNoValidation(this.props.deploy)
                    ? `--endPoint=${urlDataBase.herokuURL.trim()}api/CapUserCs`
                    : '--endPoint='
                ],
                {
                  cwd: this.destinationPath(this.options.name)
                }
              );
            } else if (this.options.credentials.authService === 'firebase') {
              this.spawnCommandSync(
                'ng',
                [
                  'add',
                  'cap-angular-schematic-auth-firebase',
                  `--apiKey=${this.options.credentials.apiKey}`,
                  `--authDomain=${this.options.credentials.authDomain}`,
                  `--databaseURL=${this.options.credentials.databaseURL}`,
                  `--projectId=${this.options.credentials.projectId}`,
                  `--storageBucket=${this.options.credentials.storageBucket}`,
                  `--senderId=${this.options.credentials.senderId}`,
                  `--appId=${this.options.credentials.appId}`,
                  `--measurementId=${this.options.credentials.measurementId}`
                ],
                {
                  cwd: this.destinationPath(this.options.name)
                }
              );
            }
          }

          this.spawnCommandSync(
            'ng',
            [
              'add',
              'cap-angular-schematic-sfcore',
              yesNoValidation(this.props.deploy)
                ? `--apiEndPoint=${urlDataBase.herokuURL.trim()}api`
                : '--apiEndPoint=http://localhost:3000/api'
            ],
            {
              cwd: this.destinationPath(this.options.name)
            }
          );

          if (this.options.deployFrontEnd) {
            await herokuDeploy.herokuCLI(
              this.options.name,
              this.options.angularHerokuApp
            );
          }
        }).catch(function(err) {
          console.error('ERROR: ', err);
        });
        break;
    }
  }
};
