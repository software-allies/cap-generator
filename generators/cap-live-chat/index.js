'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;

module.exports = class extends Generator {
    /**
   * @description Ask the user the configuration information for Live Chat
   * @author leninEmmanuel <lenin_emmanuel@softwareallies.com>
   * @returns
   */
  prompting() {
    this.log(`=========================================\nNow lets configure the ${chalk.blue('LIVE CHAT MODULE')}\n==========================================
    `);

    const prompts = [
      {
        type: 'input',
        name: 'embeddedServiceName',
        message: "What's the name of the embedded Service Name?",
        default: ''
      },
      {
        type: 'input',
        name: 'idServiceName',
        message: "idServiceName?",
        default: ''
      },
      {
        type: 'input',
        name: 'urlSandbox',
        message: "urlSandbox?",
        default: ''
      },
      {
        type: 'input',
        name: 'urlDomain',
        message: "urlDomain?",
        default: ''
      },
      {
        type: 'input',
        name: 'baseLiveAgentContentURL',
        message: "baseLiveAgentContentURL?",
        default: ''
      },
      {
        type: 'input',
        name: 'deploymentId',
        message: "deploymentId?",
        default: ''
      },
      {
        type: 'input',
        name: 'buttonId',
        message: "buttonId?",
        default: ''
      },
      {
        type: 'input',
        name: 'baseLiveAgentURL',
        message: "baseLiveAgentURL?",
        default: ''
      },
      {
        type: 'input',
        name: 'scriptUrl',
        message: "scriptUrl?",
        default: ''
      },
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * @description Once we get the information update the module to include the configuration.
   * @author leninEmmanuel <lenin_emmanuel@sofwareallies.com>
   * @returns
   */
  writing() {
    const tsParser = new Parser()
    tsParser.addExistingSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`)); // First add the file to the virtual folder the plugin creates
    const file = tsParser.getSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`)); // Then we read and parse that file to AST
    const embeddedServiceName = /embeddedServiceName: 'liveChat-embeddedServiceName'/g
    const idServiceName = /idServiceName: 'liveChat-idServiceName'/g
    const urlSandbox = /urlSandbox: 'liveChat-urlSandbox'/g
    const urlDomain = /urlDomain: 'liveChat-urlDomain'/g
    const baseLiveAgentContentURL = /baseLiveAgentContentURL: 'liveChat-baseLiveAgentContentURL'/g
    const deploymentId = /deploymentId: 'liveChat-deploymentId'/g
    const buttonId = /buttonId: 'liveChat-buttonId'/g
    const baseLiveAgentURL = /baseLiveAgentURL: 'liveChat-baseLiveAgentURL'/g
    const scriptUrl = /scriptUrl: 'liveChat-scriptUrl'/g

    const newText =  file.getText()
      .replace(embeddedServiceName, `embeddedServiceName: '${this.props.embeddedServiceName}'`)
      .replace(idServiceName, `idServiceName: '${this.props.idServiceName}'`)
      .replace(urlSandbox, `urlSandbox: '${this.props.urlSandbox}'`)
      .replace(urlDomain, `urlDomain: '${this.props.urlDomain}'`)
      .replace(baseLiveAgentContentURL, `baseLiveAgentContentURL: '${this.props.baseLiveAgentContentURL}'`)
      .replace(deploymentId, `deploymentId: '${this.props.deploymentId}'`)
      .replace(buttonId, `buttonId: '${this.props.buttonId}'`)
      .replace(baseLiveAgentURL, `baseLiveAgentURL: '${this.props.baseLiveAgentURL}'`)
      .replace(scriptUrl, `scriptUrl: '${this.props.scriptUrl}'`)

    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values
    file.insertText(0, newText); // Insert new text
    file.saveSync(); // Save all changes

    this.fs.copyTpl(
      this.templatePath('cap-live-chat/**'),
      this.destinationPath(`${this.options.name}/src/app/modules/`),
      {
        name: this.options.name
      }
    );

  }
}
