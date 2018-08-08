'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Parser = require('ts-simple-ast').default;

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(`=========================================\nNow lets configure the ${chalk.blue('AWS STORAGE MODULE')}\n==========================================
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
    const bucketRgx = /bucket: 'aws-bucket'/g
    const keyRgx = /accessKeyId: 'aws-key'/g
    const secretRgx = /secretAccessKey: 'aws-secret'/g
    const regionRgx = /region: 'aws-region'/g
    const folderRgx = /folder: 'aws-folder'/g
    const newText =  file.getText()
      .replace(bucketRgx, `bucket: '${this.props.awsBucket}'`)
      .replace(keyRgx, `accessKeyId: '${this.props.awsAccessKeyId}'`)
      .replace(secretRgx, `secretAccessKey: '${this.props.awsSecretAccessKey}'`)
      .replace(regionRgx, `region: '${this.props.awsRegion}'`)
      .replace(folderRgx, `folder: '${this.props.awsFolder}'`)

    
    file.removeText(file.getPos(), file.getEnd());

    file.insertText(0, newText)
    
    file.saveSync();

    this.fs.copyTpl(
      this.templatePath('cap-storage-aws/pages/**'),
      this.destinationPath(`${this.options.name}/src/pages/`),
      {
        name: this.options.name
      }
    );
  }
};
