'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;
const { exec, spawn } = require('promisify-child-process');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for AWS STORAGE MODULE
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  prompting() {
    // Have Yeoman greet the user.
    this
      .log(`=========================================\nNow lets configure the ${chalk.blue(
      'AWS STORAGE MODULE'
    )}\n==========================================
    `);
    const prompts = [
      {
        type: 'input',
        name: 'awsBucket',
        message: "What's the name of the bucket?",
        default: '<aws-bucket>'
      },
      {
        type: 'input',
        name: 'awsAccessKeyId',
        message: 'AWS Access Key?',
        default: '<aws-access-key>'
      },
      {
        type: 'input',
        name: 'awsSecretAccessKey',
        message: 'AWS Secret Access Key?',
        default: '<aws-secret-key>'
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: "What's the region?",
        default: '<aws-region>'
      },
      {
        type: 'input',
        name: 'awsFolder',
        message: 'S3 Folder name?',
        default: '<aws-folder>'
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * @description Once we get the information update the module to include the configuration.
   * @author Diego Moreno <diego@sofwareallies.com>
   * @returns
   */
  writing() {
    if (this.options.deployFrontEnd) {
      this.env.arguments.push(
        {key: 'AWS_BUCKET', value: this.props.awsBucket},
        {key: 'AWS_ACCESS_KEY_ID', value: this.props.awsAccessKeyId},
        {key: 'AWS_SECRET_ACCESS_KEY', value: this.props.awsSecretAccessKey},
        {key: 'AWS_REGION', value: this.props.awsRegion},
        {key: 'AWS_FOLDER', value: this.props.awsFolder},
      )
    }

    const tsEnvironment = new Parser();
    tsEnvironment.addExistingSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/src/environments/environment.ts` : 'src/environments/environment.ts'
      )
    );

    const fileEnvironment = tsEnvironment.getSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/src/environments/environment.ts` : 'src/environments/environment.ts'
      )
    );

    const environments = /export const environment = {/g;
    const newEnvironments = fileEnvironment.getText().replace(environments,
 `export const environment = {
  bucket: '',
  accessKeyId: '',
  secretAccessKey: '',
  region: '',
  folder: '',`);

    fileEnvironment.removeText(fileEnvironment.getPos(), fileEnvironment.getEnd());
    fileEnvironment.insertText(0, newEnvironments);
    fileEnvironment.saveSync();

    if (this.options.deployFrontEnd) {
      this.env.arguments.map( async x => {
        await exec(`heroku config:set ${x.key}=${x.value} --app=${this.options.angularHerokuApp}`);
      });
    }

    this.spawnCommandSync(
      'ng',
      [
        'add',
        'cap-angular-schematic-storage-aws',
        `--bucket=${this.props.awsBucket}`,
        `--accessKeyId=${this.props.awsAccessKeyId}`,
        `--secretAccessKey=${this.props.awsSecretAccessKey}`,
        `--region=${this.props.awsRegion}`,
        `--folder=${this.props.awsFolder}`
      ],
      {
        cwd: this.destinationPath(this.options.name)
      }
    );
  }
};
