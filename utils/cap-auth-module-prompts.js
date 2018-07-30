module.exports = function() {
    return [
      {
        type: 'input',
        name: 'client.auth.apiUrl',
        message: 'Set your apiUrl: ',
        default : '<auth-apiUrl>',
        when: (ctx) => ctx.client.modules.findIndex(m => m.name === 'cap-auth-module') >= 0
      },
      {
        type: 'input',
        name: 'client.auth.loginEndPoint',
        message: 'Set your loginEndPoint: ',
        default : '<auth-login-end-point>',
        when: (ctx) => ctx.client.modules.findIndex(m => m.name === 'cap-auth-module') >= 0
      }
    ]
  }