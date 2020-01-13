'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;
var exec = require('child-process-promise').exec;
const cp = require('child_process');
const heroku = require('./heroku-connect');
const deploy = require('./heroku-deploy');
const loopback = require('./loopback-build');

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
        default: this.options.name + '-api',
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
  writing () {
    switch (this.props.sync) {
      case 'CustomSync':
        console.log('We are working on it');
        break;

      case 'HerokuConnect':
        exec('lb --version', async (error, stdout) => {
          if (error) {
            console.log('error, no tienes loopback instalado');
          } else {

            await loopback.loopbackCLI(this.props.path);

            let urlDataBase = await heroku.herokuCLI(this.props.path, this.templatePath('cap-heroku-connect-api/mapping'));

            //  ***********************************************************************
            //  ***********************************************************************
            this.fs.copyTpl(
              this.templatePath('cap-heroku-connect-api/models/**'),
              this.destinationPath(`${this.props.path}`),
              {}
            );
            this.fs.copyTpl(
              this.templatePath('cap-heroku-connect-api/auth/**'),
              this.destinationPath(`${this.props.path}/server/`),
              {
                domain: this.options.AuthDomain
              }
            );
            this.fs.copyTpl(
              this.templatePath('cap-heroku-connect-web/**'),
              this.destinationPath(`${this.options.name}/src/app/modules/`),
              {}
            );
            //  ***********************************************************************
            //  ***********************************************************************
            const tsParser = new Parser();
            tsParser.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
            const file = tsParser.getSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
            file.removeText(file.getPos(), file.getEnd());
            file.saveSync();

            const tsParserAuth = new Parser();
            tsParserAuth.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/boot/authentication.js`))
            const fileDelete = tsParserAuth.getSourceFile(this.destinationPath(`${this.props.path}/server/boot/authentication.js`));
            fileDelete.removeText(fileDelete.getPos(), fileDelete.getEnd());
            fileDelete.saveSync();

            const tsParseDB = new Parser();
            tsParseDB.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/datasources.json`));  // First add the file to the virtual folder the plugin creates
            const fileDB = tsParseDB.getSourceFile(this.destinationPath(`${this.props.path}/server/datasources.json`)); // Then we read and parse that file to AST
            const dataSource = /"connector": "memory"/g;
            const newTextDB = fileDB.getText().replace(dataSource,
              `"url": "${urlDataBase.postgresURL}?ssl=true",
"connector": "postgresql"`);
            fileDB.removeText(fileDB.getPos(), fileDB.getEnd());  // Remove all the text since we already have the text formed with the correct values
            fileDB.insertText(0, newTextDB); // Insert new text
            fileDB.saveSync();  // Save all changes

            const tsParseAuth = new Parser();
            tsParseAuth.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/middleware.json`));
            const fileAuth = tsParseAuth.getSourceFile(this.destinationPath(`${this.props.path}/server/middleware.json`));
            const authMiddleware = /"auth": {},/g;
            const restApiRoot = "${restApiRoot}";
            const newTextAuth = fileAuth.getText()
              .replace(authMiddleware,
                `"auth": {
  "./auth.js":{
      "paths": [
        "${restApiRoot}"
      ]
    }
  },`);
            fileAuth.removeText(fileAuth.getPos(), fileAuth.getEnd());
            fileAuth.insertText(0, newTextAuth);
            fileAuth.saveSync();

            const tsParseDependencies = new Parser();
            tsParseDependencies.addExistingSourceFile(this.destinationPath(`${this.props.path}/package.json`));
            const fileDependencies = tsParseDependencies.getSourceFile(this.destinationPath(`${this.props.path}/package.json`));
            const dependencies = /"dependencies": {/g;
            const newTextDependencies = fileDependencies.getText().replace(dependencies,
              `"dependencies": {
"express-jwt": "^5.3.1",
"jwks-rsa": "^1.6.0",
"loopback-connector-postgresql": "^3.8.1",`);
            fileDependencies.removeText(fileDependencies.getPos(), fileDependencies.getEnd());
            fileDependencies.insertText(0, newTextDependencies);
            fileDependencies.saveSync();

            const tsParserModelConfig = new Parser();
            tsParserModelConfig.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
            const fileModelConfig = tsParserModelConfig.getSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
            fileModelConfig.insertText(0,
`{
  "_meta": {
  "sources": [
    "loopback/common/models",
    "loopback/server/models",
    "../common/models",
    "./models"
  ],
  "mixins": [
    "loopback/common/mixins",
    "loopback/server/mixins",
    "../common/mixins",
    "./mixins"
  ]
  },
  "Lead": {
    "dataSource": "db",
    "public": true
  },
  "Account": {
    "dataSource": "db",
    "public": true
  },
  "Contact": {
    "dataSource": "db",
    "public": true
  },
  "Opportunity": {
    "dataSource": "db",
    "public": true
  }
}`);
            fileModelConfig.saveSync();

            await deploy.herokuCLI(this.props.path);
          }
        }).catch(function (err) {
          console.error('ERROR: ', err);
        });
      break;
    }
  }
};
