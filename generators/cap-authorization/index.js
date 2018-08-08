'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;

module.exports = class extends Generator {

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

  writing() {
    const tsParser = new Parser()
    tsParser.addExistingSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`));
    const file = tsParser.getSourceFile(this.destinationPath(`${this.options.name}/src/app/app.module.ts`))
    const apiUrlRgx = /apiUrl: 'apiUrl'/g
    const endpointRgx = /loginEndpoint: 'loginEndPoint'/g
    const newText =  file.getText()
      .replace(apiUrlRgx, `apiUrl: '${this.props.authApiUrl}'`)
      .replace(endpointRgx, `loginEndpoint: '${this.props.authLoginEndPoint}'`)
    
    file.removeText(file.getPos(), file.getEnd());

    file.insertText(0, newText)
    
    file.saveSync();

    this.fs.copyTpl(
      this.templatePath('cap-auth-module/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`), {
        name: this.options.name
      }
    );
  }
}