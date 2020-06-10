/**
 * CAP MODULES.
 * An array with all the modules for cap that can be included with the generator
 * We use the 'value.name' of each package as the identifier for the subgenerator
 * so that means, the subgenerator name should be the same string as this field
 */

exports.Angular9 = [
  {
    name: 'CAP-Storage-Amazon-Web-Services',
    short: 'AWS',
    value: {
      schameticName:'cap-angular-schematic-storage-aws',
      moduleName: 'cap-storage-aws',
      version: 'latest',
      name: 'cap-storage-aws',
    }
  },
  {
    name: 'CAP-Server-Side-Rendering',
    short: 'SSR',
    value: {
      schameticName:'noen',
      moduleName: '',
      version: 'none',
      name: 'cap-ssr'
    }
  },
  {
    name: 'CAP-SalesForce-Live-Chat',
    short: 'LiveChat',
    value: {
      schameticName:'cap-angular-schematic-livechat',
      moduleName: 'cap-livechat-sf',
      version: 'latest',
      name: 'cap-live-chat',
    }
  }
];

exports.Angular8 = [
  {
    name: 'CAP-Storage-Amazon-Web-Services',
    short: 'AWS',
    value: {
      schameticName:'cap-angular-schematic-storage-aws',
      moduleName: 'cap-storage-aws',
      version: 'latest',
      name: 'cap-storage-aws'
    }
  },
  {
    name: 'CAP-Server-Side-Rendering',
    short: 'SSR',
    value: {
      schameticName:'noen',
      moduleName: '',
      version: 'none',
      name: 'cap-ssr'
    }
  },
  {
    name: 'CAP-SalesForce-Live-Chat',
    short: 'LiveChat',
    value: {
      schameticName:'cap-angular-schematic-livechat',
      moduleName: 'cap-livechat-sf',
      version: 'latest',
      name: 'cap-live-chat'
    }
  }
];

exports.auth_firebase = {
  Angular9: {
    schameticName:'cap-angular-schematic-auth-firebase',
    moduleName: 'cap-authentication-firebase',
    version: 'latest'
    // version: '~2.0.0'
  },
  Angular8: {
    schameticName:'cap-angular-schematic-auth-firebase',
    moduleName: 'cap-authentication-firebase',
    version: 'latest'
    // version: '~1.0.0'
  },
}

exports.auth_auth0 = {
  Angular9: {
    schameticName:'cap-angular-schematic-auth-auth0',
    moduleName: 'cap-authentication',
    version: 'latest'
    // version: '~2.0.0'
  },
  Angular8: {
    schameticName:'cap-angular-schematic-auth-auth0',
    moduleName: 'cap-authentication',
    version: 'latest'
    // version: '~1.0.0'
  },
}

exports.sync = {
  Angular9: {
    schameticName:'cap-angular-schematic-sfcore',
    moduleName: 'cap-sfcore',
    version: 'latest'
    // version: '~2.0.0'
  },
  Angular8: {
    schameticName:'cap-angular-schematic-sfcore',
    moduleName: 'cap-sfcore',
    version: 'latest'
    // version: '~1.0.0'
  },
}
