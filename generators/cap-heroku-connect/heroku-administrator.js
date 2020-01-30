const color = require('colors-cli/toxic');
const loading = require('loading-cli');
let load = null;

exports.run = (promise, messages, appName) => {
  let commandResult;
  let errorAction;
  return new Promise(async (resolve, reject) => {
    try {
      load = loading(messages.action_message.blue).start();

      if (appName) {
        commandResult = await promise(appName);
      } else {
        commandResult = await promise();
      }

      if (commandResult.stdout === 'no plugins installed\n') {
        load.stop();
        load.fail(messages.error_message);
        errorAction = {
          messages: commandResult.stdout,
          code: 400,
          description: 'Heroku Connect is not installed'
        };
        reject(errorAction);
      } else {
        load.stop();
        load.succeed(messages.response_message);
        resolve(commandResult);
      }
    } catch (error) {
      console.log('error: ', error);
      switch (error.code) {
        case 1:
          load.stop();
          load.fail('The application name is already taken.');
          errorAction = {
            messages: `${error.stderr}`,
            code: 1,
            description: 'The application name is already taken.'
          };
          reject(errorAction);
          break;

        // Reject when the user is not find it
        case 100:
          load.stop();
          load.fail(messages.error_message);
          errorAction = {
            messages: 'User not found',
            code: 100,
            description: "You don't access"
          };
          reject(errorAction);
          break;
        case 127:
          load.stop();
          load.fail(messages.error_message);
          errorAction = {
            description: "Heroku's CLI is not installed.",
            messages: "Heroku's CLI is not installed.",
            code: 127
          };
          reject(errorAction);
          break;

        default:
          break;
      }
    }
  });
};
