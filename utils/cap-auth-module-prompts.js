module.exports = function() {
    return [
      {
        type: 'input',
        name: 'client.auth.apiUrl',
        message: 'Set your apiUrl: ',
        default : '<auth-apiUrl>',
        when: (ctx) => ctx.client.modules.findIndex(m => m.name === 'authmodule-ionic3-angular6') >= 0
      },
      {
        type: 'input',
        name: 'client.auth.loginEndPoint',
        message: 'Set your loginEndPoint: ',
        default : '<auth-login-end-point>',
        when: (ctx) => ctx.client.modules.findIndex(m => m.name === 'authmodule-ionic3-angular6') >= 0
      }
    ]
  }