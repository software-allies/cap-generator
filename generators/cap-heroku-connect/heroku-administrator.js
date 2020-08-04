const color = require('colors-cli/toxic');
const loading = require('loading-cli');
let load = null;

exports.run = (promise, messages, appName) => {
  let commandResult;
  let errorAction;

  return new Promise(async (resolve, reject) => {
    try {
      load = loading(messages.actionMessage.blue).start();

      // eslint-disable-next-line no-unused-expressions
      appName
        ? (commandResult = await promise(appName))
        : (commandResult = await promise());

      if (commandResult) {
        if (commandResult.error) {
          if (messages.actionMessage === 'Login...') {
            load.stop();
            load.fail(commandResult.error.messages);
            reject(commandResult.error);
          }
        } else {
          let data = commandResult.stdout;
          switch (data) {
            case data.includes('Logged in as '):
              load.stop();
              load.succeed(messages.responseMessage);
              resolve(messages.responseMessage);
              break;
            case data.includes('Installing plugin heroku-connect-plugin... Done'):
              load.stop();
              load.succeed(messages.responseMessage);
              resolve(messages.responseMessage);
              break;
            case data.includes('added'):
              load.stop();
              load.succeed(messages.responseMessage);
              resolve(messages.responseMessage);
              break;
            case data.includes('no plugins installed'):
              load.stop();
              load.succeed(messages.responseMessage);
              resolve(messages.responseMessage);
              break;
            default:
              load.stop();
              load.succeed(messages.responseMessage);
              resolve(commandResult);
              break;
          }
          // if (commandResult.stdout.includes('Logged in as ')) {
          //   load.stop();
          //   load.succeed(messages.responseMessage);
          //   resolve(messages.responseMessage);
          // }

          // if (
          //   commandResult.stderr.includes(
          //     'Installing plugin heroku-connect-plugin... Done'
          //   )
          // ) {
          //   load.stop();
          //   load.succeed(messages.responseMessage);
          //   resolve(messages.responseMessage);
          // }

          // if (commandResult.stdout.includes('added')) {
          //   load.stop();
          //   load.succeed(messages.responseMessage);
          //   resolve(messages.responseMessage);
          // }

          // if (commandResult.stdout.includes('no plugins installed\n')) {
          //   load.stop();
          //   load.fail(messages.error_message);
          //   errorAction = {
          //     messages: commandResult.stdout,
          //     code: 400,
          //     description: 'Heroku Connect is not installed'
          //   };
          //   reject(errorAction);
          // }
          // load.stop();
          // load.succeed(messages.responseMessage);
          // resolve(commandResult);
        }
      } else {
        load.stop();
        load.succeed(messages.responseMessage);
        let response = {
          stderr: '',
          stdout: 'Successful mapping'
        };
        resolve(response);
      }
    } catch (error) {
      console.log('error: ', error);
      switch (error.code) {
        case 1:
          if (error.stderr.includes('No connection(s) found')) {
            load.stop();
            load.fail(`${error.stderr} on Heroku`);
            errorAction = {
              messages: `${error.stderr}`,
              code: 1,
              description: `${error.stderr} on Heroku`
            };
            reject(errorAction);
          } else if (
            error.stderr.includes(
              `You've reached the limit of 5 apps for unverified accounts`
            )
          ) {
            load.stop();
            load.fail(
              "You've reached the limit of 5 apps for unverified accounts. Delete some apps or add a credit card to verify your Heroku account."
            );
            errorAction = {
              messages: `${error.stderr}`,
              code: 1,
              description:
                "You've reached the limit of 5 apps for unverified accounts. Delete some apps or add a credit card to verify your Heroku account.."
            };
            reject(errorAction);
          } else if (error.stderr.includes(`throw new Error('no input');`)) {
            load.stop();
            load.fail('Wrong heroku credentials');
            errorAction = {
              messages: `${error.stderr}`,
              code: 1,
              description: 'Wrong heroku credentials'
            };
            reject(errorAction);
          } else if (error.stderr.includes('heroku: Enter your login credentials')) {
            load.stop();
            load.fail(messages.errorMessage);
            errorAction = {
              messages: 'User not found',
              code: 2,
              description: "You don't a user register jet"
            };
            reject(errorAction);
          } else {
            load.stop();
            load.fail(messages.errorMessage);
            errorAction = {
              description: "Heroku's CLI is not installed.",
              messages: "Heroku's CLI is not installed.",
              code: 127
            };
            reject(errorAction);
          }
          break;
        case 2:
          load.stop();
          load.fail(messages.errorMessage);
          errorAction = {
            messages: 'User not found',
            code: 2,
            description: "You don't a user register jet"
          };
          reject(errorAction);
          break;
        // Reject when the user is not find it
        case 100:
          load.stop();
          load.fail(messages.errorMessage);
          errorAction = {
            messages: 'User not found',
            code: 100,
            description: "You don't access"
          };
          reject(errorAction);
          break;
        case 101:
          load.stop();
          load.fail(messages);
          break;
        case 127:
          load.stop();
          load.fail(messages.errorMessage);
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
