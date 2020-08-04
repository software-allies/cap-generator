const herokuService = require('./heroku-administrator');
const command = require('./exec-functions');
const loadMessages = require('./load-messages');
let herokuConfiguration = {};

exports.verifyInstallation = async (email, password) => {
  try {
    await herokuService.run(command.herokuVersion, loadMessages.herokuV);
    await herokuService.run(command.herokuConnectVerification, loadMessages.herokuC);

    await herokuService.run(command.checkUser, loadMessages.checkUser);
  } catch (error) {
    // let credentials = { email: email, password: password };
    switch (error.code) {
      case 2:
        try {
          // await herokuService.run(command.login, loadMessages.login, credentials);
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        } catch (error) {
          await herokuService.run(command.loginPop, loadMessages.loginPop);
          // if (error.code === 2) {
          //   await herokuService.run(command.loginPop, loadMessages.loginPop);
          // } else {
          //   await herokuService.run(command.loginPop, loadMessages.loginPop);
          // }
        }
        break;
      case 100:
        try {
          // await herokuService.run(command.login, loadMessages.login, credentials);
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        } catch (error) {
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        }
        break;
      case 127:
        try {
          await herokuService.run(
            command.herokuInstallation,
            loadMessages.herokuCLIInstallation
          );
          await herokuService.run(
            command.herokuConnectInstallation,
            loadMessages.herokuConnectIns
          );
          await herokuService.run(command.loginPop, loadMessages.loginPop);
          // await herokuService.run(command.login, loadMessages.login, credentials);
        } catch (error) {
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        }
        break;
      // Code 400

      case 400:
        try {
          await herokuService.run(
            command.herokuConnectInstallation,
            loadMessages.herokuConnectIns
          );
          await herokuService.run(command.loginPop, loadMessages.loginPop);
          // await herokuService.run(command.login, loadMessages.login, credentials);
        } catch (error) {
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        }
        break;

      default:
        try {
          await herokuService.run(
            command.herokuInstallation,
            loadMessages.herokuCLIInstallation
          );
          await herokuService.run(
            command.herokuConnectInstallation,
            loadMessages.herokuConnectIns
          );
          await herokuService.run(command.loginPop, loadMessages.loginPop);
          // await herokuService.run(command.login, loadMessages.login, credentials);
        } catch (error) {
          await herokuService.run(command.loginPop, loadMessages.loginPop);
        }
        break;
    }
  }
};

const appsCreation = async appName => {
  try {
    let timestamp = Math.floor(Date.now() / 1000);
    appName = `${appName.slice(0, 19)}-${timestamp}`;
    appName = appName.trim();
    let urls = await herokuService.run(
      command.herokuCreateApp,
      loadMessages.herokuCreateApp,
      appName
    );
    let herokUrls = urls.stdout.split('|');
    herokuConfiguration.herokuURL = herokUrls[0];
    herokuConfiguration.herokuGit = herokUrls[1];

    await herokuService.run(
      command.hrkCreatePostgreSql,
      loadMessages.herokuCreatePostgres,
      appName
    );

    return appName;
  } catch (error) {
    let situation = {
      message: error.messages,
      code: error.code,
      desc: error.description
    };
    return situation;
  }
};

const startConfigurationApp = async (name, path) => {
  try {
    let credentials = await herokuService.run(
      command.herokuCredentials,
      loadMessages.herokuCredentials,
      name
    );

    let startPosition = credentials.stdout.search('postgres');
    // // DBURL it's going to save the url that it's going to be saved in Loopback
    const DBURL = credentials.stdout.slice(startPosition, credentials.stdout.length - 1);
    herokuConfiguration.postgresURL = DBURL;
    let dbstatus = await herokuService.run(
      command.herokuConnectCreation,
      loadMessages.herokuConnectCreation,
      name
    );

    let commandSetupConnect = dbstatus.stdout.split('`')[1];

    await herokuService.run(
      command.setUpConnect,
      loadMessages.herokuConnectSetup,
      commandSetupConnect
    );

    // Let infoConnection = await herokuService.run(command.authConnection, loadMessages.authConnection, name)
    // let startPositionC = infoConnection.stdout.search('ID') + 13
    // let endPositionC = infoConnection.stdout.search('Description') - 1

    // var connection_id = infoConnection.stdout.slice(startPositionC, endPositionC);

    let token = await herokuService.run(
      command.tokenApplication,
      loadMessages.tokenApplication
    );

    let config = {
      name: name,
      token: token.stdout
    };

    await herokuService.run(command.curlPost, loadMessages.curlPost, config);

    await herokuService.run(
      command.schemaConnection,
      loadMessages.schemaConnection,
      name
    );

    await herokuService.run(command.salesforceAuth, loadMessages.salesforceAuth, name);

    let map = {
      path: path,
      name: name
    };

    // await herokuService.run(
    //   command.schemaConnection,
    //   loadMessages.schemaConnection,
    //   name
    // );
    await herokuService.run(command.mapping, loadMessages.mapping, map);
  } catch (error) {
    console.log('error: ', error);
    try {
      if (error.code === 1) {
        if (name) {
          let token = await herokuService.run(
            command.tokenApplication,
            loadMessages.tokenApplication
          );

          let config = {
            name: name,
            token: token.stdout
          };

          await herokuService.run(command.curlPost, loadMessages.curlPost, config);

          await herokuService.run(
            command.schemaConnection,
            loadMessages.schemaConnection,
            name
          );

          await herokuService.run(
            command.salesforceAuth,
            loadMessages.salesforceAuth,
            name
          );

          let map = {
            path: path,
            name: name
          };

          await herokuService.run(command.mapping, loadMessages.mapping, map);
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
};

exports.herokuCLI = async (appName, path, email, password) => {
  try {
    await this.verifyInstallation(email, password);
    let newName = await appsCreation(appName);
    herokuConfiguration.appName = newName;
    if (newName.code === 1) {
      throw new Error({ ...newName });
    } else {
      // eslint-disable-next-line no-unused-expressions
      newName
        ? await startConfigurationApp(newName, path)
        : await startConfigurationApp(appName, path);
      return herokuConfiguration;
    }
    // }
  } catch (error) {
    if (error.description === 'Heroku Connect is not installed') {
      await herokuService.run(
        command.herokuConnectInstallation,
        loadMessages.herokuConnectIns
      );
    }
    if (error.code === 100) {
      await herokuService.run(command.login, loadMessages.login);
    }
  }
};
