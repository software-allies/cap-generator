'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;

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

  writing() {
    const tsParser = new Parser();
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
    file.saveSync();
  }

  install() {
    this.spawnCommandSync(
      'ng',
      [
        'add',
        'cap-angular-schematic-livechat@latest',
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
