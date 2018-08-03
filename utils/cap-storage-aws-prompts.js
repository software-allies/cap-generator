/**
 * Prompts for CAP-STORAGE-AWS Module (https://www.npmjs.com/package/cap-storage-aws)
 */
module.exports = [
  {
    type: 'input',
    name: 'awsBucket',
    message: "What's the name of the bucket?",
    default: '<aws-bucket>',
    when: ctx => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
  },
  {
    type: 'input',
    name: 'awsAccessKeyId',
    message: 'AWS Access Key?',
    default: '<aws-access-key>',
    when: ctx => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
  },
  {
    type: 'input',
    name: 'awsSecretAccessKey',
    message: 'AWS Secret Access Key?',
    default: '<aws-secret-key>',
    when: ctx => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
  },
  {
    type: 'input',
    name: 'awsRegion',
    message: "What's the region?",
    default: '<aws-region>',
    when: ctx => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
  },
  {
    type: 'input',
    name: 'awsFolder',
    message: 'S3 Folder name?',
    default: '<aws-folder>',
    when: ctx => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
  }
];
