'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Parser = require('ts-simple-ast').default;
const newApplication = require('../../utils/new-application');
const existingApplication = require('../../utils/existing-application');
const herokuConnectScript = require('../cap-heroku-connect/heroku-connect');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument("appName", { type: String, required: false });
  }

  prompting() {

    function yesNoValidation(value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }

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
        message: "What's the name of your application?",
        default: this.options.appName || this.appname,
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
      {
        type: 'input',
        name: 'deploy',
        message: `Do you want to deploy your application in Heroku? [y/n]`,
        default: 'n'
      },
      {
        type: 'input',
        name: 'sync',
        message: `Do you want to use a synchronization/API service? [y/n]`,
        default: 'n'
      },
      {
        type: 'input',
        name: 'email',
        message: `Heroku email`,
        default: '',
        when: ctx => yesNoValidation(ctx.deploy) || yesNoValidation(ctx.sync)
      },
      {
        type: 'password',
        name: 'password',
        message: `Heroku password`,
        default: '',
        when: ctx => yesNoValidation(ctx.deploy) || yesNoValidation(ctx.sync)
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    function yesNoValidation(value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }

    if (yesNoValidation(this.props.deploy)) {
      this.props.modules.push({ name: 'cap-deploy' });
    }

    if (yesNoValidation(this.props.sync)) {
      this.props.modules.push({ name: 'cap-heroku-connect' });
    }
  }

  async install() {
    function yesNoValidation(value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }

    if (this.props.projecttype === 'create') {
      this.spawnCommandSync('ng', [
        'new',
        this.props.appName,
        '--routing',
        '--style',
        'scss'
      ]);

      this.spawnCommandSync(
        'npm',
        [
          'install',
          '--save',
          'express',
          'path',
          'dotenv'
        ], {
        cwd: this.destinationPath(this.props.appName)
      });

      const tsParser = new Parser();
      tsParser.addExistingSourceFile(
        this.destinationPath(
          `${this.props.appName}/tsconfig.json`
        )
      );
      const file = tsParser.getSourceFile(
        this.destinationPath(
          `${this.props.appName}/tsconfig.json`
        )
      );
      const target = /"target": "es2015"/g;

      const newText = file.getText().replace(target, `"target": "es5"`);
      file.removeText(file.getPos(), file.getEnd());
      file.insertText(0, newText);
      file.saveSync();

      // if (!this.props.modules.find(x => x.name === 'cap-heroku-connect')) {
        if (this.props.authService === 'auth0') {

          this.env.arguments.push(
            {key: 'AUTH0_CLIENT_ID', value: this.props.AUTH0_CLIENT_ID},
            {key: 'AUTH0_CLIENT_SECRET', value: this.props.AUTH0_CLIENT_SECRET},
            {key: 'AUTH0_DOMAIN', value: this.props.AUTH0_DOMAIN}
          )

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
              cwd: this.destinationPath(this.props.appName)
            }
          );
        } else if (this.props.authService === 'firebase') {

          this.env.arguments.push(
            {key: 'API_KEY', value: this.props.apiKey},
            {key: 'AUTH_DOMAIN', value: this.props.authDomain},
            {key: 'DATA_BASE_URL', value: this.props.databaseURL},
            {key: 'PROJECT_ID', value: this.props.projectId},
            {key: 'STORAGE_BUCKET', value: this.props.storageBucket},
            {key: 'SENDER_ID', value: this.props.senderId},
            {key: 'APP_ID', value: this.props.appId},
            {key: 'MEASUREMENT_ID', value: this.props.measurementId},
          );

          this.spawnCommandSync(
            'ng',
            [
              'add',
              'cap-angular-schematic-auth-firebase',
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
      // }

      if (yesNoValidation(this.props.deploy) || yesNoValidation(this.props.sync)) {
        await herokuConnectScript.verifyInstallation(this.props.email, this.props.password);
      }

      if (yesNoValidation(this.props.deploy)) {
        this.props.appNameHeroku = this.props.appName + '-' + Date.now();
        this.spawnCommandSync('heroku', ['apps:create', this.props.appNameHeroku]);
      }

      this.spawnCommandSync(
        'ng',
        [
          'add',
          'cap-angular-schematic-responsive',
          this.props.appName,
          true,
          true,
          this.props.authService,
          false,
          this.props.modules.find(x => x.name === 'cap-heroku-connect')
            ? true
            : false
        ],
        {
          cwd: this.destinationPath(this.props.appName)
        }
      );
    }
  }

  end() {
    function yesNoValidation(value) {
      return value.toLowerCase() === 'yes' || value.toLowerCase() === 'y' ? true : false;
    }
    // Call the subgenerator for each module the user selected
    if (this.props.modules && this.props.modules.length) {
      this.props.modules.forEach(m => {
        this.composeWith(require.resolve(`../${m.name}`), {
          name: this.props.appName ? this.props.appName : '',
          auth: this.props.modules.find(x => x.name === 'cap-heroku-connect') ? true : false,
          credentials: this.props,
          deployFrontEnd: yesNoValidation(this.props.deploy),
          angularHerokuApp: this.props.appNameHeroku,
          modules: this.props.modules
        });
      });
    } else {
      // this.log(yosay(chalk.bgGreen('Happy coding')));
    }
  }
};
