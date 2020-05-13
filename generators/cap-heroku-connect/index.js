'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
var exec = require('child-process-promise').exec;
const HerokuConnect = require('./heroku-connect');
const herokuDeploy = require('./heroku-deploy');
const loopback = require('./loopback-build');
const loopbackConfig = require('./loopback-configuration');
const firebaseJwt = require('./firebase-jwt');
const ts_ast =  require('../app/utils/AST-files');
const slugify = require('underscore.string/slugify');

module.exports = class extends Generator {

  prompting() {
    this.log(`=========================================\n
    Now lets configure the ${chalk.blue('HEROKU CONNECT MODULE')}
    \n==========================================`);
    const prompts = [
      /*{
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
      },*/
      {
        type: 'input',
        name: 'path',
        message: "What's the name of your API?",
        default: `${this.options.name}-api`,
        // when: ctx => ctx.sync === 'HerokuConnect'
      },
      {
        type: 'confirm',
        name: 'deploy',
        message: `Do you want to deploy on Heroku? [y/n]`,
        default: false,
        // when: ctx => ctx.sync === 'HerokuConnect'
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {

    this.props.path = slugify(this.props.path);

    /*switch (this.props.sync) {
      case 'CustomSync':
        console.log('We are working on it');
        break;

      case 'HerokuConnect':*/
    exec('lb --version', async error => {
      if (error) {
        this.log(
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
              ? this.props.deploy ? '${process.env.AUTH_URL}/api/v2/' : `${this.options.credentials.AUTH0_DOMAIN}/api/v2/`
              : `${this.options.credentials.projectId}`,
          issuer:
            this.options.credentials.authService === 'auth0'
              ? this.props.deploy ? '${process.env.AUTH_URL}/' : `${this.options.credentials.AUTH0_DOMAIN}/`
              : `https://securetoken.google.com/${
                  this.options.credentials.projectId
                }`,
          jwksUri:
            this.options.credentials.authService === 'auth0'
              ? this.props.deploy ? '${process.env.AUTH_URL}/.well-known/jwks.json': `${this.options.credentials.AUTH0_DOMAIN}/.well-known/jwks.json`
              : `https://${
                  this.options.credentials.projectId
                }.firebaseio.com/jwks/${jkws}.json`
        }
      );

      this.fs.write(
        this.destinationPath(`${this.props.path}/server/datasources.local.js`),
            `
module.exports = {
  "heroku": {
    "url": ${this.props.deploy ? 'process.env.DATABASE_URL' : `"${urlDataBase.postgresURL}"`}+"?ssl=true",
    "name": "heroku",
    "connector": "postgresql"
  }
}`);

      await loopbackConfig.loopbackConfiguration(
        this.props.path,
        this.destinationPath(`${this.props.path}`),
        urlDataBase ? urlDataBase.postgresURL : '',
        this.props.deploy
      );

      if (this.props.deploy) {
        await herokuDeploy.herokuCLI(
          this.props.path,
          urlDataBase ? urlDataBase.appName : '',
          'AUTH_URL',
          this.options.credentials.authService === 'auth0'
            ? this.options.credentials.AUTH0_DOMAIN
            : `https://${this.options.credentials.projectId}.firebaseio.com/jwks/${jkws}.json`
          ,true
        );
      }

      await ts_ast.astFiles(
        this.destinationPath(`${this.options.name}/src/app/modules/cap-authentication/cap-authentication.module.ts`),
        `endPoint: ''`,
        this.props.deploy
          ? `endPoint: '${urlDataBase.herokuURL.trim()}api/CapUserCs'`
          : `endPoint: 'http://localhost:3000/api/CapUserCs'`
      );

      this.spawnCommandSync(
        'ng',
        [
          'add',
          'cap-angular-schematic-sfcore@latest',
          this.props.deploy,
          this.props.deploy
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
          this.options.angularHerokuApp,
          'API_URL',
          `${urlDataBase.herokuURL.trim()}api`,
          true
        );
      }

    }).catch(function(err) {
      console.error('ERROR: ', err);
    });
        /*break;
    }*/
  }
};
