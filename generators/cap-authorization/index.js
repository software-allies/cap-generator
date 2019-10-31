'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;

module.exports = class extends Generator {

   /**
   * @description Ask the user the configuration information for AUTH MODULE
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  prompting() {
    // Have Yeoman greet the user.
    this.log(`=========================================\nNow lets configure the ${chalk.blue('AUTH MODULE')}\n==========================================
    `);
    const prompts = [
      {
        type: 'list',
        name: 'modules',
        message: 'Select the service you want to use to authenticate users:',
        choices: [
          {
            name: `Firebase`,
            value: 'firebase'
          },
          {
            name: `Auth0`,
            value: 'auth0'
          }
        ],
      },
      {
        type: 'input',
        name: 'AUTH0_CLIENT_ID',
        message: 'Set your Auth0 Client ID: ',
        default: '',
        when: ctx => ctx.modules === 'auth0'
      },
      {
        type: 'input',
        name: 'AUTH0_CLIENT_SECRET',
        message: 'Set your Auth0 Client Secret: ',
        default: '',
        when: ctx => ctx.modules === 'auth0'
      },
      {
        type: 'input',
        name: 'AUTH0_DOMAIN',
        message: 'Set your Auth0 Domain: ',
        default: '',
        when: ctx => ctx.modules === 'auth0'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

   /**
   * @description Once we get the information update the module to include the configuration.
   * @author Christofer Flores <cristofer@sofwareallies.com>
   * @returns
   */
  writing() {
    const tsParser = new Parser()
    tsParser.addExistingSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`)); // First add the file to the virtual folder the plugin creates
    const file = tsParser.getSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`)); // Then we read and parse that file to AST
    const apiUrlRgx = /apiUrl: 'apiUrl'/g
    const endpointRgx = /loginEndpoint: 'loginEndPoint'/g
    const newText =  file.getText()
      .replace(apiUrlRgx, `apiUrl: '${this.props.authApiUrl}'`)
      .replace(endpointRgx, `loginEndpoint: '${this.props.authLoginEndPoint}'`)

    file.removeText(file.getPos(), file.getEnd()); // Remove all the text since we already have the text formed with the correct values

    file.insertText(0, newText); // Insert new text

    file.saveSync(); // Save all changes

    if (this.props.modules = 'auth0'){
      this.fs.write(this.destinationPath(`${this.options.name}/src/environments/environment.ts`),
      `export const environment = {
        production: false,
        AUTH0_DOMAIN: '${this.props.AUTH0_DOMAIN}',
        AUTH0_CLIENT_ID: '${this.props.AUTH0_CLIENT_ID}',
        AUTH0_CLIENT_SECRET: '${this.props.AUTH0_CLIENT_SECRET}'
      };`)
    } else if (this.props.modules = 'firebase'){
      console.log('Firebase');
    }
    // Finally just copy the pages
    this.fs.copyTpl(
      this.templatePath('cap-auth/**'),
      this.destinationPath(`${this.options.name}/src/app/modules/`), {
        name: this.options.name
      }
    );
  }
}
