'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const { exec } = require('promisify-child-process');
const ast = require('../app/utils/AST-files');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for CONTENTFUL MODULE
   * @author Diego Moreno <diego@sofwareallies.com>
   * @returns
   */
  prompting() {
    // Have Yeoman greet the user.
    this
      .log(`=========================================\nNow lets configure the ${chalk.blue(
      'CAP CONTENTFUL MODULE'
    )}\n==========================================
    `);
    const prompts = [
      {
        type: 'input',
        name: 'space_id',
        message: "What's your Space ID?",
        default: ''
      },
      {
        type: 'input',
        name: 'environment',
        message: "What's your environment?",
        default: ''
      },
      {
        type: 'input',
        name: 'delivery_accessToken',
        message: "What's the delivery access token?",
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
        { key: 'SPACE_ID', value: this.props.space_id },
        { key: 'ENVIRONMENT', value: this.props.environment },
        { key: 'DELIVERY_ACCESSTOKEN', value: this.props.delivery_accessToken }
      );
    }

    await ast.astFiles(
      this.destinationPath(
        this.options.name
          ? `${this.options.name}/src/environments/environment.ts`
          : 'src/environments/environment.ts'
      ),
      `export const environment = {`,
      `export const environment = {
space_id: '',
environment: '',
delivery_accessToken: '',
`
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
        'cap-angular-schematic-contentful@latest',
        this.options.credentials.version ? `--version=8` : '--version=9',
        `--space_id=${this.props.space_id}`,
        `--environment=${this.props.environment}`,
        `--delivery_accessToken=${this.props.delivery_accessToken}`
      ],
      {
        cwd: this.destinationPath(this.options.name)
      }
    );
  }
};
