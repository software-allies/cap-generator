/**
 * CAP MODULES.
 * An array with all the modules for cap that can be included with the generator
 * We use the 'value.name' of each package as the identifier for the subgenerator
 * so that means, the subgenerator name should be the same string as this field
 */
module.exports = [
  {
    name: 'CAP-Storage-AWS-Module',
    value: {
      name: 'cap-storage-aws',
      version: '1.0.1'
    },
    short: 'CAP AWS'
  },
  {
    name: 'CAP-Auth-Module',
    value: {
      name: 'cap-authorization',
      version: '0.0.2'
    },
    short: 'CAP Auth'
  },
  {
    name: 'CAP-Messages',
    value: {
      name: 'cap-messages',
      version: '0.0.1'
    },
    short: 'CAP Messages'
  },
  {
    name: 'CAP-Push-Notification',
    value: {
      name: 'cap-push-notifications',
      version: '0.0.1'
    },
    short: 'CAP Push'
  }
];
