/**
 * Prompts for CAP-AUTHORIZATION Module (https://www.npmjs.com/package/cap-authorization)
 */
module.exports = [
  {
    type: 'input',
    name: 'authApiUrl',
    message: 'Set your apiUrl: ',
    default: '<auth-apiUrl>',
    when: (ctx) => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-authorization') >= 0
  },
  {
    type: 'input',
    name: 'authLoginEndPoint',
    message: 'Set your loginEndPoint: ',
    default: '<auth-login-end-point>',
    when: (ctx) => ctx.modules && ctx.modules.findIndex(m => m.name === 'cap-authorization') >= 0
  },
]