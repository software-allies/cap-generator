'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const { exec, spawn } = require('promisify-child-process');
const ts_ast = require ('../app/utils/AST-files');

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
        default: ''
      },
      {
        type: 'input',
        name: 'awsAccessKeyId',
        message: 'AWS Access Key?',
        default: ''
      },
      {
        type: 'input',
        name: 'awsSecretAccessKey',
        message: 'AWS Secret Access Key?',
        default: ''
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: "What's the region?",
        default: ''
      },
      {
        type: 'input',
        name: 'awsFolder',
        message: 'S3 Folder name?',
        default: ''
      },
      {
        type: 'input',
        name: 'awsEndpoint',
        message: 'Endpoint?',
        default: ''
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
  async writing() {
    if (this.options.deployFrontEnd) {
      this.env.arguments.push(
        { key: 'AWS_BUCKET', value: this.props.awsBucket },
        { key: 'AWS_ACCESS_KEY_ID', value: this.props.awsAccessKeyId },
        { key: 'AWS_SECRET_ACCESS_KEY', value: this.props.awsSecretAccessKey },
        { key: 'AWS_REGION', value: this.props.awsRegion },
        { key: 'AWS_FOLDER', value: this.props.awsFolder },
        { key: 'AWS_ENDPOINT', value: this.props.awsEndpoint }
      );
    }

    await ts_ast.astFiles(
      this.destinationPath(
        this.options.name
          ? `${this.options.name}/src/environments/environment.ts`
          : 'src/environments/environment.ts'
      ),
      `export const environment = {`,
      `export const environment = {
bucket: '',
accessKeyId: '',
secretAccessKey: '',
region: '',
folder: '',
endpoint: '',`
    );

    if (this.options.deployFrontEnd) {
      this.env.arguments.map(async x => {
        await exec(
          `heroku config:set ${x.key}=${x.value} --app=${this.options.angularHerokuApp}`
        );
      });
    }

    this.spawnCommandSync(
      'ng',
      [
        'add',
        `cap-angular-schematic-storage-aws@${this.options.env.options.aws.version}`,
        `--bucket=${this.props.awsBucket}`,
        `--accessKeyId=${this.props.awsAccessKeyId}`,
        `--secretAccessKey=${this.props.awsSecretAccessKey}`,
        `--region=${this.props.awsRegion}`,
        `--folder=${this.props.awsFolder}`
        // `--endpoint=${this.props.endpoint}`
      ],
      {
        cwd: this.destinationPath(this.options.name)
      }
    );
  }
};
