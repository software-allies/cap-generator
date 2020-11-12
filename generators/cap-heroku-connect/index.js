'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
var exec = require('child-process-promise').exec;
const HerokuConnect = require('./heroku-connect');
const herokuDeploy = require('./heroku-deploy');
const loopbackConfig = require('./loopback-configuration');
const firebaseJwt = require('./firebase-jwt');
const tsAst = require('../app/utils/AST-files');
const slugify = require('underscore.string/slugify');

module.exports = class extends Generator {
  prompting() {
    this.log(`=========================================\n
    Now lets configure the ${chalk.blue('HEROKU CONNECT MODULE')}
    \n==========================================`);
    const prompts = [
      {
        type: 'input',
        name: 'path',
        message: "What's the name of your API?",
        default: `${this.options.name}-api`,
        validate: name => {
          if (name.length > 25) {
            return false;
          }
          return true;
        }
        // When: ctx => ctx.sync === 'HerokuConnect'
      },
      {
        type: 'list',
        name: 'lbVersion',
        message: 'Choose an loopback version',
        choices: [
          {
            name: `Loopback 3`,
            value: true
          },
          {
            name: `Loopback 4`,
            value: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'deploy',
        message: `Do you want to deploy on Heroku? [y/n]`,
        default: false
        // When: ctx => ctx.sync === 'HerokuConnect'
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  async writing() {
    this.props.path = slugify(this.props.path);

    if (this.props.lbVersion) {
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
          this.templatePath('cap-heroku-connect-api/mapping'),
          this.options.credentials.email,
          this.options.credentials.password
        );
        // Console.log('urlDataBase: ', urlDataBase);

        this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/models/**'),
          this.destinationPath(`${this.props.path}`),
          {}
        );

        let jkws =
          this.options.credentials.authService === 'firebase'
            ? await firebaseJwt.getGoogleCredentials(this.options.credentials.projectId)
            : null;

        this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/auth/**'),
          this.destinationPath(`${this.props.path}/server/`),
          {
            audience:
              this.options.credentials.authService === 'auth0'
                ? this.props.deploy
                  ? '${process.env.AUTH_URL}/api/v2/'
                  : `${this.options.credentials.AUTH0_DOMAIN}/api/v2/`
                : `${this.options.credentials.projectId}`,
            issuer:
              this.options.credentials.authService === 'auth0'
                ? this.props.deploy
                  ? '${process.env.AUTH_URL}/'
                  : `${this.options.credentials.AUTH0_DOMAIN}/`
                : `https://securetoken.google.com/${this.options.credentials.projectId}`,
            jwksUri:
              this.options.credentials.authService === 'auth0'
                ? this.props.deploy
                  ? '${process.env.AUTH_URL}/.well-known/jwks.json'
                  : `${this.options.credentials.AUTH0_DOMAIN}/.well-known/jwks.json`
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
        "url": ${
          this.props.deploy ? 'process.env.DATABASE_URL' : `"${urlDataBase.postgresURL}"`
          }+"?ssl=true",
        "name": "heroku",
        "connector": "postgresql"
      }
    }`
        );

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
              : `https://${
              this.options.credentials.projectId
              }.firebaseio.com/jwks/${jkws}.json`,
            true
          );
        }

        await tsAst.astFunctions.astFiles(
          this.destinationPath(
            `${
            this.options.name
            }/src/app/modules/cap-authentication/cap-authentication.module.ts`
          ),
          `endPoint: ''`,
          this.props.deploy
            ? `endPoint: '${urlDataBase.herokuURL.trim()}api/CapUserCs'`
            : `endPoint: 'http://localhost:3000/api/CapUserCs'`
        );

        this.spawnCommandSync(
          'ng',
          [
            'add',
            `cap-angular-schematic-sfcore@${this.options.env.options.sfCore.version}`,
            this.props.deploy ? `--credentials=${false}` : `--credentials=${true}`,
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
      /* Break;
    } */
    } else {
      try {
        let lb4Version = await exec('lb4 -v');
        if (lb4Version.stderr === '') {
          let urlDataBase = await HerokuConnect.herokuCLI(
            this.props.path,
            this.templatePath('cap-heroku-connect-api/mapping'),
            this.options.credentials.email,
            this.options.credentials.password
          );
          let credentials = urlDataBase.postgresURL.split(`:`);
          let env = {
            user: credentials[1].split('//')[1],
            password: credentials[2].split('@')[0],
            host: credentials[2].split('@')[1],
            port: credentials[3].split('/')[0],
            db: credentials[3].split('/')[1],
            url: urlDataBase.postgresURL
          };
          this.composeWith(require.resolve('./loopback-4.js'), {
            path: this.props.path,
            credentials: env,
            appName: urlDataBase.appName
          });
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }

  end() {}
};
