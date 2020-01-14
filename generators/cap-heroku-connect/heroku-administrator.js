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
    }
  });
};
