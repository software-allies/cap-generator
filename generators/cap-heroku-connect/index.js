'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;
var exec = require('child-process-promise').exec;
const cp = require('child_process');
const heroku = require('./heroku-connect');

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
      },
      {
        type: 'input',
        name: 'dataBase',
        message: "What's the URL data base?",
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
    const child = cp.spawn("bash", ["-c", `lb ${this.props.path} --skip-install`], { cwd: "" });
    switch (this.props.sync) {
      case 'CustomSync':
        console.log('We are working on it');
        break;

      case 'HerokuConnect':
        exec('lb --version', (error, stdout) => {
          if (error) {
            console.log(`name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            console.log("you don't have Loopback-cli installed, we will install it right away");
            exec("npm install -g loopback-cli", (error, stdout, stderr) => {
              if (error) {
                console.log(
                  `name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`
                );
                console.log('Loopback could not be installed, try later');
              } else {
                // console.log('stdout',stdout);
                console.log("Loopback was installed correctly, we will proceed to create a RESt API");
                child.stdout.on("data", (data) => { child.stdin.write("\n") });
                child.stderr.on("data", (data) => { console.log('warning: incompatibility error') });
                child.on('exit', async code => {
                  if (code === 0) {
                    exec(
                      'npm install --save loopback-connector-postgresql',
                      { cwd: `./${this.props.path}` },
                      (error, stdout) => {
                        if (error) {
                          console.log('error: error installing postgres dependency');
                        } else if (stdout) {
                          console.log('Postgres dependency installed');
                        }
                      }
                    );
                    console.log(`Your REST API has been successfully created ${code}`);
                    this.fs.copyTpl(
                      this.templatePath('cap-heroku-connect-api/**'),
                      this.destinationPath(`${this.props.path}`),
                      {}
                    );
                    this.fs.copyTpl(
                      this.templatePath('cap-heroku-connect-web/**'),
                      this.destinationPath(`${this.options.name}/src/app/modules/`),
                      {}
                    );

                    let urlDataBase = await heroku.herokuCLI(this.props.path, this.templatePath('cap-heroku-connect-api/mapping'));
                    const tsParser = new Parser();
                    const tsParseDB = new Parser();
                    tsParser.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`)); // First add the file to the virtual folder the plugin creates
                    tsParseDB.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/datasources.json`));
                    const file = tsParser.getSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`)); // Then we read and parse that file to AST
                    const fileDB = tsParseDB.getSourceFile(this.destinationPath(`${this.props.path}/server/datasources.json`));
                    const importsModels =
                      /"Role": {/g;
                    const dataSource = /"connector": "memory"/g;
                    const newText = file.getText().replace(
                      importsModels,
                      `"Lead": {
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
                       },
                       "Role": {`
                    );
                    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values
                    file.insertText(0, newText); // Insert new text
                    file.saveSync(); // Save all changes
                    console.log('urlDataBase.postgresURL: ', urlDataBase);

                    const newTextDB = fileDB.getText().replace(
                      dataSource,
                      `"url": "${urlDataBase.postgresURL}?ssl=true",
                     "connector": "postgresql"`
                    );
                    fileDB.removeText(fileDB.getPos(), fileDB.getEnd());
                    fileDB.insertText(0, newTextDB);
                    fileDB.saveSync();
                  }
                });
              }
            });
          } else if (stdout) {
            console.log("You have loopback installed, we will proceed to create a REST API");
            child.stdout.on("data", (data) => { child.stdin.write("\n") });
            child.stderr.on("data", (data) => { console.log('warning: incompatibility error') });
            child.on('exit', async code => {
              if (code === 0) {
                exec('npm install --save loopback-connector-postgresql', { cwd: `./${this.props.path}` }, (error, stdout, stderr) => {
                  if (error) {
                    console.log('error: error installing postgres dependency')
                  } else if (stdout) {
                    console.log('Postgres dependency installed.');
                  }
                });
                console.log(`Your REST API has been successfully created ${code} .`);

                let urlDataBase = await heroku.herokuCLI(this.props.path, this.templatePath('cap-heroku-connect-api/mapping'));
                console.log('urlDataBase: ', urlDataBase);
                /**
                 * copyTPL START
                 */
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

                /**
                 * model-config Delete
                 */
                const tsParser = new Parser();
                tsParser.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
                const file = tsParser.getSourceFile(this.destinationPath(`${this.props.path}/server/model-config.json`));
                file.removeText(file.getPos(), file.getEnd());
                file.saveSync();

                /**
                 * authentication.js Delete
                 */
                const tsParserAuth = new Parser();
                tsParserAuth.addExistingSourceFile(this.destinationPath(`${this.props.path}/server/boot/authentication.js`))
                const fileDelete = tsParserAuth.getSourceFile(this.destinationPath(`${this.props.path}/server/boot/authentication.js`));
                fileDelete.removeText(fileDelete.getPos(), fileDelete.getEnd());
                fileDelete.saveSync();

                /**
                 * DataSource-file
                 */
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

                /**
                 * middleware.json
                 */
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

                /**
                 * API-dependencies
                 */
                const tsParseDependencies = new Parser();
                tsParseDependencies.addExistingSourceFile(this.destinationPath(`${this.props.path}/package.json`));
                const fileDependencies = tsParseDependencies.getSourceFile(this.destinationPath(`${this.props.path}/package.json`));
                const dependencies = /"dependencies": {/g;
                const newTextDependencies = fileDependencies.getText().replace(dependencies,
                  `"dependencies": {
    "express-jwt": "^5.3.1",
    "jwks-rsa": "^1.6.0",`);
                fileDependencies.removeText(fileDependencies.getPos(), fileDependencies.getEnd());
                fileDependencies.insertText(0, newTextDependencies);
                fileDependencies.saveSync();

                /**
                 * model-config.json
                 */
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
                fileModelConfig.saveSync()
              }
            });
          }
        }).catch(function (err) {
          console.error('ERROR: ', err);
        });
        break;
    }
  }
};
