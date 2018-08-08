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
        type: 'input',
        name: 'authApiUrl',
        message: 'Set your apiUrl: ',
        default: '<auth-apiUrl>'
      },
      {
        type: 'input',
        name: 'authLoginEndPoint',
        message: 'Set your loginEndPoint: ',
        default: '<auth-login-end-point>'
      }
    ]

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

    // Finally just copy the pages
    this.fs.copyTpl(
      this.templatePath('cap-auth-module/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`), {
        name: this.options.name
      }
    );
  }
}