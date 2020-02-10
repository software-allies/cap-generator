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
      version: '3.0.3'
    },
    short: 'CAP AWS'
  },
  {
    name: 'CAP-Live-Chat',
    value: {
      name: 'cap-live-chat',
      version: '0.0.1'
    },
    short: 'CAP LiveChat'
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
    name: 'CAP-Heroku-Connect',
    value: {
      name: 'cap-heroku-connect',
      version: '0.0.1'
    },
    short: 'CAP HerokuConnect'
  }
];
