const color = require('colors-cli/toxic');
const loading = require('loading-cli');
let load = null;

exports.run = (promise, messages, appName) => {
  let commandResult;
  return new Promise(async (resolve, reject) => {
    try {
      load = loading(messages.actionMessage.blue).start();
      if (appName) {
        commandResult = await promise(appName);
      } else {
        commandResult = await promise();
      }

      if (commandResult.stdout === 'no plugins installed\n') {
        load.stop();
        load.fail(messages.errorMessage);
        let err = {
          messages: commandResult.stdout,
          code: 400,
          description: 'Heroku Connect is not installed'
        };
        reject(err);
      } else {
        load.stop();
        load.succeed(messages.responseMessage);
        resolve(commandResult);
      }
    } catch (error) {
      console.log('error from testing: ', error);
      // Reject when the user is not find it
      // Error when the user doesn't have installed Heroku's CLI
      if (error.code === 1) {
        load.stop();
        load.fail(messages.error_message);
        let err = {
          messages: 'Heroku CLI is not installed',
          code: 1,
          description: "You don't have installed Heroku CLI"
        };
        reject(err);
      }
      if (error.code === 100) {
        load.stop();
        load.fail(messages.error_message);
        let err = {
          messages: 'User not found',
          code: 100,
          description: "You don't access"
        };
        reject(err);
      }
    }
  });
};
