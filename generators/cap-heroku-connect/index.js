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
    const child = cp.spawn('/bin/sh', ['-c', `lb ${this.props.path} --skip-install`], {
      cwd: ''
    });
    // eslint-disable-next-line default-case
    switch (this.props.sync) {
      case 'CustomSync':
        console.log('We are working on it');
        break;

      case 'HerokuConnect':
        exec('lb --version', (error, stdout) => {
          if (error) {
            console.log(
              `name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`
            );
            console.log('no tienes instalado Loopback-cli, enseguida lo instalaremos');
            exec('npm install -g loopback-cli', error => {
              if (error) {
                console.log(
                  `name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`
                );
                console.log('Loopback could not be installed, try later');
              } else {
                // Console.log(stdout);
                console.log(
                  'Loopback was installed correctly, we will proceed to create a RESt API'
                );

                child.stdout.on('data', () => child.stdin.write('\n'));
                child.stderr.on('data', () => {
                  console.log('warning: incompatibility error');
                });
                child.on('exit', code => {
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
                    const tsParser = new Parser();
                    const tsParceDB = new Parser();
                    tsParser.addExistingSourceFile(
                      this.destinationPath(`${this.props.path}/server/model-config.json`)
                    ); // First add the file to the virtual folder the plugin creates
                    tsParceDB.addExistingSourceFile(
                      this.destinationPath(`${this.props.path}/server/datasources.json`)
                    );
                    const file = tsParser.getSourceFile(
                      this.destinationPath(`${this.props.path}/server/model-config.json`)
                    ); // Then we read and parse that file to AST
                    const fileDB = tsParceDB.getSourceFile(
                      this.destinationPath(`${this.props.path}/server/datasources.json`)
                    );
                    const importsModels = /"Role": {/g;
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

                    const newTextDB = fileDB.getText().replace(
                      dataSource,
                      `"url": "${this.props.dataBase}?ssl=true",
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
            console.log(
              'You have loopback installed, we will proceed to create a REST API'
            );
            child.stdout.on('data', () => child.stdin.write('\n'));
            child.stderr.on('data', _data => {
              console.log('warning: incompatibility error');
            });
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

                // This is the place were Heroku CLI stars to run
                let urlDataBase = await heroku.herokuCLI(this.props.path, this.templatePath('cap-heroku-connect-api/mapping'));
                const tsParser = new Parser();
                const tsParceDB = new Parser();
                tsParser.addExistingSourceFile(
                  this.destinationPath(`${this.props.path}/server/model-config.json`)
                ); // First add the file to the virtual folder the plugin creates
                tsParceDB.addExistingSourceFile(
                  this.destinationPath(`${this.props.path}/server/datasources.json`)
                );
                const file = tsParser.getSourceFile(
                  this.destinationPath(`${this.props.path}/server/model-config.json`)
                ); // Then we read and parse that file to AST
                const fileDB = tsParceDB.getSourceFile(
                  this.destinationPath(`${this.props.path}/server/datasources.json`)
                );
                const importsModels = /"Role": {/g;
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
                file.saveSync(); // Save all change
                const newTextDB = fileDB.getText().replace(
                  dataSource,
                  `"url": "${urlDataBase.postgresURl}?ssl=true",
                 "connector": "postgresql"`
                );
                fileDB.removeText(fileDB.getPos(), fileDB.getEnd());
                fileDB.insertText(0, newTextDB);
                fileDB.saveSync();
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
