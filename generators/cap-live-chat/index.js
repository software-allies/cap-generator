'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
// const Parser = require('ts-simple-ast').default;
const { exec, spawn } = require('promisify-child-process');
const ts_ast =  require('../../utils/AST-files');

module.exports = class extends Generator {
  /**
   * @description Ask the user the configuration information for Live Chat
   * @author Diego Moreno <diego@softwareallies.com>
   * @returns
   */
  prompting() {
    this
      .log(`=========================================\nNow lets configure the ${chalk.blue(
      'LIVE CHAT MODULE'
    )}\n==========================================
    `);

    const prompts = [
      {
        type: 'input',
        name: 'embeddedServiceName',
        message: 'Name of the embedded Service: ',
        default: ''
      },
      {
        type: 'input',
        name: 'idServiceName',
        message: 'iD Service name: ',
        default: ''
      },
      {
        type: 'input',
        name: 'urlSandbox',
        message: 'URL Sandbox: ',
        default: ''
      },
      {
        type: 'input',
        name: 'urlDomain',
        message: 'URL Domain: ',
        default: ''
      },
      {
        type: 'input',
        name: 'baseLiveAgentContentURL',
        message: 'Base LiveAgent Content URL: ',
        default: ''
      },
      {
        type: 'input',
        name: 'deploymentId',
        message: 'Deployment ID: ',
        default: ''
      },
      {
        type: 'input',
        name: 'buttonId',
        message: 'Button ID: ',
        default: ''
      },
      {
        type: 'input',
        name: 'baseLiveAgentURL',
        message: 'Base LiveAgent URL: ',
        default: ''
      },
      {
        type: 'input',
        name: 'scriptUrl',
        message: 'Script URL: ',
        default: ''
      },
      {
        type: 'input',
        name: 'eswLiveAgentDevName',
        message: 'ESW LiveAgent DevName: ',
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
        {key: 'LIVECHAT_SERVICE_NAME', value: this.props.embeddedServiceName},
        {key: 'LIVECHAT_SERVICE_NAME_ID', value: this.props.idServiceName},
        {key: 'LIVECHAT_URL_SANDBOX', value: this.props.urlSandbox},
        {key: 'LIVECHAT_URL_DOMAIN', value: this.props.urlDomain},
        {key: 'LIVECHAT_BASE_LIVE_AGENT_CONTENT_URL', value: this.props.baseLiveAgentContentURL},
        {key: 'LIVECHAT_DEPLOYMENT_ID', value: this.props.deploymentId},
        {key: 'LIVECHAT_BUTTON_ID', value: this.props.buttonId},
        {key: 'LIVECHAT_BASE_LIVE_AGENT_URL', value: this.props.baseLiveAgentURL},
        {key: 'LIVECHAT_SCRIPT_URL', value: this.props.scriptUrl},
        {key: 'LIVECHAT_LIVE_AGENT_DEV_NAME', value: this.props.eswLiveAgentDevName},
      )
    }

    /*const tsParser = new Parser();
    tsParser.addExistingSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/src/app/app.component.html` : 'src/app/app.component.html'
      )
    );
    const file = tsParser.getSourceFile(
      this.destinationPath(
        this.options.name ? `${this.options.name}/src/app/app.component.html` : 'src/app/app.component.html'
      )
    );

    const selector = /<div id="main">/g;
    const newText = file.getText().replace(selector,
      `<div id="main">
  <cap-live-chat-sf></cap-live-chat-sf>`);

    file.removeText(file.getPos(), file.getEnd());
    file.insertText(0, newText);
    file.saveSync();*/


    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/src/app/app.component.html`
        : 'src/app/app.component.html'),
        `<div id="main">`,
        `<div id="main">
  <cap-live-chat-sf></cap-live-chat-sf>`
    );

    await ts_ast.astFiles(
      this.destinationPath(this.options.name
        ? `${this.options.name}/src/app/app.component.html`
        : 'src/app/app.component.html'),
        `export const environment = {`,
        `export const environment = {
    embeddedServiceName: '',
    idServiceName: '',
    urlSandbox: '',
    urlDomain: '',
    baseLiveAgentContentURL: '',
    deploymentId: '',
    buttonId: '',
    baseLiveAgentURL: '',
    scriptUrl: '',
    eswLiveAgentDevName: '',`
    )

    /*const tsEnvironment = new Parser();
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
  embeddedServiceName: '',
  idServiceName: '',
  urlSandbox: '',
  urlDomain: '',
  baseLiveAgentContentURL: '',
  deploymentId: '',
  buttonId: '',
  baseLiveAgentURL: '',
  scriptUrl: '',
  eswLiveAgentDevName: '',`);

    fileEnvironment.removeText(fileEnvironment.getPos(), fileEnvironment.getEnd());
    fileEnvironment.insertText(0, newEnvironments);
    fileEnvironment.saveSync();*/
  }

  install() {
    if (this.options.deployFrontEnd) {
      this.env.arguments.map( async x => {
        await exec(`heroku config:set ${x.key}=${x.value} --app=${this.options.angularHerokuApp}`);
      });
    }

    this.spawnCommandSync(
      'ng',
      [
        'add',
        'cap-angular-schematic-livechat',
        `--embeddedServiceName=${this.props.embeddedServiceName}`,
        `--idServiceName=${this.props.idServiceName}`,
        `--urlSandbox=${this.props.urlSandbox}`,
        `--urlDomain=${this.props.urlDomain}`,
        `--baseLiveAgentContentURL=${this.props.baseLiveAgentContentURL}`,
        `--deploymentId=${this.props.deploymentId}`,
        `--buttonId=${this.props.buttonId}`,
        `--baseLiveAgentURL=${this.props.baseLiveAgentURL}`,
        `--scriptUrl=${this.props.scriptUrl}`,
        `--eswLiveAgentDevName=${this.props.eswLiveAgentDevName}`
      ],
      {
        cwd: this.destinationPath(this.options.name)
      }
    );
  }
};
