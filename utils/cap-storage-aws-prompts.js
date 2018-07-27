module.exports = () => {
  return [
    {
      type: 'input',
      name: 'client.aws.bucket',
      message: "What's the name of the bucket?",
      default: '<aws-bucket>',
      when: ctx => ctx.client.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
    },
    {
      type: 'input',
      name: 'client.aws.accessKeyId',
      message: 'AWS Access Key?',
      default: '<aws-access-key>',
      when: ctx => ctx.client.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
    },
    {
      type: 'input',
      name: 'client.aws.secretAccessKey',
      message: 'AWS Secret Access Key?',
      default: '<aws-secret-key>',
      when: ctx => ctx.client.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
    },
    {
      type: 'input',
      name: 'client.aws.region',
      message: "What's the region?",
      default: '<aws-region>',
      when: ctx => ctx.client.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
    },
    {
      type: 'input',
      name: 'client.aws.folder',
      message: 'S3 Folder name?',
      default: '<aws-folder>',
      when: ctx => ctx.client.modules.findIndex(m => m.name === 'cap-storage-aws') >= 0
    }
  ];
};
