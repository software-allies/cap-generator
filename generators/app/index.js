'use strict';
const Generator = require('yeoman-generator');
const slugify = require('underscore.string/slugify');
const chalk = require('chalk');
const yosay = require('yosay');
const { v4: uuidv4 } = require('uuid');

const ts_ast = require('./utils/AST-files');

const herokuConnectScript = require('../cap-heroku-connect/heroku-connect');
const HerokuConnect = require('./utils/packages-versions').sync;

const Angular9 = require('./utils/packages-versions').Angular9;
const Angular8 = require('./utils/packages-versions').Angular8;

const Firebase = require('./utils/packages-versions').auth_firebase;
const Auth0 = require('./utils/packages-versions').auth_auth0;

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('appName', { type: String, required: false });
  }

  prompting() {
    this.log(
      yosay(`${chalk.red('CAP Generator\n Build amazing apps faster and better')}`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: "What's the name of your application?",
        default: this.options.appName || this.appname,
        require: true,
        required: true,
        validate: name => {
          if (name.length > 20) {
            console.log('\nThe name contains more than 20 characters\n');
            return false;
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'version',
        message: 'Select the Angular version you have installed',
        choices: [
          {
            name: `Angular 8`,
            value: true
          },
          {
            name: `Angular 9`,
            value: false
          }
        ]
      },
      {
        type: 'list',
        name: 'authService',
        message: 'Choose an authentication service',
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
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include: (Angular 8)',
        choices: Angular8,
        when: ctx => ctx.version === true
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Select the modules you want to include: (Angular 9)',
        choices: Angular9,
        when: ctx => ctx.version === false
      },
      {
        type: 'confirm',
        name: 'pwa',
        message: `Do you want your app to work like PWA (Progressive Web Application)?`,
        default: false,
        when: ctx => !ctx.modules.find(x => x.name === 'cap-ssr')
      },

      {
        type: 'confirm',
        name: 'deploy',
        message: `Do you want to deploy your application in Heroku?`,
        default: false
      },
      {
        type: 'confirm',
        name: 'sync',
        message: `Do you want to use a synchronization/API service?`,
        default: false
      },
      {
        type: 'input',
        name: 'email',
        message: `Heroku email`,
        default: '',
        when: ctx => ctx.deploy || ctx.sync
      },
      {
        type: 'password',
        name: 'password',
        message: `Heroku password`,
        default: '',
        when: ctx => ctx.deploy || ctx.sync
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
    if (this.props.authService === 'auth0') {
      let auth0 = this.props.version ? Auth0.Angular8 : Auth0.Angular9;
      this.env.options = { ...this.env.options, auth0 };
    } else {
      let firebase = this.props.version ? Firebase.Angular8 : Firebase.Angular9;
      this.env.options = { ...this.env.options, firebase };
    }

    if (this.props.modules.find(x => x.name === 'cap-storage-aws')) {
      let aws = this.props.modules.find(x => x.name === 'cap-storage-aws');
      this.env.options = { ...this.env.options, aws };
    }

    if (this.props.modules.find(x => x.name === 'cap-live-chat')) {
      let liveChat = this.props.modules.find(x => x.name === 'cap-live-chat');
      this.env.options = { ...this.env.options, liveChat };
    }

    if (this.props.modules.find(x => x.name === 'cap-angular-contentful')) {
      let contentful = this.props.modules.find(x => x.name === 'cap-angular-contentful');
      this.env.options = { ...this.env.options, contentful };
    }

    if (this.props.pwa) {
      let pwa = this.props.version
        ? { pwaPackage: '@angular/pwa', pwaPackageVersion: '~0.803.29', ngUniversal: '@nguniversal/express-engine', ngUniversalVersion: '^8.2.6', appShell: '@schematics/angular:appShell', appShellVersion: '~8.3.29' }
        : { pwaPackage: '@angular/pwa', pwaPackageVersion: '~0.901.12', ngUniversal: '@nguniversal/express-engine', ngUniversalVersion: '~9.0.0', appShell: '@schematics/angular:appShell', appShellVersion: '~9.1.12' };
      this.env.options = { ...this.env.options, pwa };
      this.props.modules.push({ name: 'cap-pwa' });
    }

    if (this.props.deploy) {
      let deploy = this.props.version
        ? { typescript: '~3.5.3', node: '~12.14.1', npm: '~6.13.6' }
        : { typescript: '~3.8.3', node: '~12.18.0', npm: '~6.14.4' };
      this.env.options = { ...this.env.options, deploy };
      this.props.modules.push({ name: 'cap-deploy' });
    }

    if (this.props.sync) {
      let sfCore = this.props.version ? HerokuConnect.Angular8 : HerokuConnect.Angular9;
      this.env.options = { ...this.env.options, sfCore };
      this.props.modules.push({ name: 'cap-heroku-connect' });
    }
  }

  writing() {
    this.props.appName = slugify(this.props.appName);
  }

  async install() {
    this.spawnCommandSync('ng', [
      'new',
      this.props.appName,
      '--routing',
      '--style',
      'scss'
    ]);

    this.spawnCommandSync('npm', ['install', '--save', 'express', 'path', 'dotenv'], {
      cwd: this.destinationPath(this.props.appName)
    });

    this.spawnCommandSync(
      'ng',
      ['add', 'cap-angular-schematic-bootstrap@latest', '4.0.0', true],
      {
        cwd: this.destinationPath(this.props.appName)
      }
    );

    await this.fs.copyTpl(
      this.templatePath('server/**'),
      this.destinationPath(this.props.appName),
      {
        appName: this.props.appName
      }
    );

    await this.fs.copyTpl(
      this.templatePath('env/**'),
      this.destinationPath(this.props.appName),
      {
        modules: this.props.modules,
        auth: this.props.authService
      }
    );

    if (this.props.version) {
      await ts_ast.astFunctions.astFiles(
        this.destinationPath(`${this.props.appName}/tsconfig.json`),
        `"target": "es2015"`,
        `"target": "es5"`
      );
    }

    if (this.props.authService === 'auth0') {

      this.env.arguments.push(
        { key: 'AUTH0_CLIENT_ID', value: this.props.AUTH0_CLIENT_ID },
        { key: 'AUTH0_CLIENT_SECRET', value: this.props.AUTH0_CLIENT_SECRET },
        { key: 'AUTH0_DOMAIN', value: this.props.AUTH0_DOMAIN }
      );

      this.spawnCommandSync(
        'ng',
        [
          'add',
          `cap-angular-schematic-auth-auth0@${this.env.options.auth0.version}`,
          '--angularVersion=Angular 9',
          this.props.deploy ? `--credentials=${false}` : `--credentials=${true}`,
          `--clientID=${this.props.AUTH0_CLIENT_ID}`,
          `--clientSecret=${this.props.AUTH0_CLIENT_SECRET}`,
          `--domain=${this.props.AUTH0_DOMAIN}`,
          `--endPoint=`
        ],
        {
          cwd: this.destinationPath(this.props.appName)
        }
      );
    } else if (this.props.authService === 'firebase') {
      this.env.arguments.push(
        { key: 'FIREBASE_API_KEY', value: this.props.apiKey },
        { key: 'FIREBASE_DOMAIN', value: this.props.authDomain },
        { key: 'FIREBASE_DATABASE', value: this.props.databaseURL },
        { key: 'FIREBASE_PROJECT_ID', value: this.props.projectId },
        { key: 'FIREBASE_BUCKET', value: this.props.storageBucket },
        { key: 'FIREBASE_SENDER_ID', value: this.props.senderId },
        { key: 'FIREBASE_APP_ID', value: this.props.appId },
        { key: 'FIREBASE_MEASUREMENT', value: this.props.measurementId }
      );

      this.spawnCommandSync(
        'ng',
        // eslint-disable-next-line no-sparse-arrays
        [
          'add',
          `cap-angular-schematic-auth-firebase@${this.env.options.firebase.version}`,
          this.props.deploy ? `--credentials=${false}` : `--credentials=${true}`,
          `--apiKey=${this.props.apiKey}`,
          `--authDomain=${this.props.authDomain}`,
          `--databaseURL=${this.props.databaseURL}`,
          `--projectId=${this.props.projectId}`,
          `--storageBucket=${this.props.storageBucket}`,
          `--senderId=${this.props.senderId}`,
          `--appId=${this.props.appId}`,
          `--measurementId=${this.props.measurementId}`,
          `--endPoint=`
        ],
        {
          cwd: this.destinationPath(this.props.appName)
        }
      );
    }

    this.spawnCommandSync(
      'ng',
      [
        'add',
        'cap-angular-schematic-responsive@~1.2.1',
        this.props.appName,
        true,
        true,
        this.props.authService,
        this.props.modules.find(x => x.name === 'cap-heroku-connect') ? true : false
      ],
      {
        cwd: this.destinationPath(this.props.appName)
      }
    );

    if (this.props.deploy) {
      await herokuConnectScript.verifyInstallation(this.props.email, this.props.password);

      // This.props.appNameHeroku = this.props.appName + '-' + Date.now();
      // The Date.now() returns a string with 13 characters
      let auxUUID = uuidv4();
      let lengthUUID = 29 - this.props.appName.length;
      let newUUID = auxUUID.slice(0, lengthUUID);
      this.props.appNameHeroku = `${this.props.appName}-${newUUID}`;
      if (this.props.appNameHeroku.charAt(this.props.appNameHeroku.length - 1) === '-') {
        this.spawnCommandSync('heroku', [
          'apps:create',
          (this.props.appNameHeroku = this.props.appNameHeroku.slice(
            0,
            this.props.appNameHeroku.length - 1
          ))
        ]);
      } else {
        this.spawnCommandSync('heroku', ['apps:create', this.props.appNameHeroku]);
      }
    }
  }

  end() {
    // Call the subgenerator for each module the user selected
    if (this.props.modules && this.props.modules.length) {
      this.props.modules.forEach(m => {
        this.composeWith(require.resolve(`../${m.name}`), {
          name: this.props.appName ? this.props.appName : '',
          auth: this.props.modules.find(x => x.name === 'cap-heroku-connect') ? true : false,
          credentials: this.props,
          deployFrontEnd: this.props.deploy,
          angularHerokuApp: this.props.appNameHeroku,
          modules: this.props.modules
        });
      });
    } /*else {
      this.log(yosay(chalk.bgGreen('Happy coding')));
    }*/
  }
};
