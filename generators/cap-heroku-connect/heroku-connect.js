const herokuService = require('./heroku-administrator');
const command = require('./exec-functions');
const loadMessages = require('./load-messages');
const prompts = require('prompts');
let herokuConfiguration = {};

const verifyInstallation = async () => {
  try {
    await herokuService.run(command.herokuVersion, loadMessages.herokuV);
    await herokuService.run(command.herokuConnectVerification, loadMessages.herokuC);
    await herokuService.run(command.checkUser, loadMessages.checkUser);

  } catch (error) {
    switch (error.code) {
      case 100:
        await herokuService.run(command.login, loadMessages.login);
        break;
      case 127:
        await herokuService.run(
          command.herokuInstallation,
          loadMessages.herokuCLIInstallation
        );
        await herokuService.run(
          command.herokuConnectInstallation,
          loadMessages.herokuConnectIns
        );
        await herokuService.run(command.login, loadMessages.login);
        break;
      // Code 400
      default:
        await herokuService.run(
          command.herokuConnectInstallation,
          loadMessages.herokuConnectIns
        );
        await herokuService.run(command.login, loadMessages.login);
        break;
    }
  }
};

const appsCreation = async appName => {
  try {
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
  } catch (error) {
    let isNotTheValidName = true;
    let promptResponse;
    while (isNotTheValidName) {
      // eslint-disable-next-line no-await-in-loop
      promptResponse = await prompts({
        type: 'text',
        name: 'newName',
        message: 'New name: ',
        validate: newName => newName.length < 5 ? 'You wrote a name with less than 5 characters' : true
      });

      // eslint-disable-next-line no-negated-condition
      if (promptResponse.newName !== appName) isNotTheValidName = false;
      else
        console.log(`The ${promptResponse.newName} is already taken, write another one`);
    }
    if (promptResponse) {
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
        promptResponse.newName
      );
      return promptResponse.newName;
    }
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

    await herokuService.run(
      command.schemaConnection,
      loadMessages.schemaConnection,
      name
    );
    await herokuService.run(command.mapping, loadMessages.mapping, map);
  } catch (error) {
    console.log('error:  connect', error);
  }
};

exports.herokuCLI = async (appName, path) => {
  try {
    await verifyInstallation();
    let newName = await appsCreation(appName);

    // eslint-disable-next-line no-unused-expressions
    newName
      ? await startConfigurationApp(newName, path)
      : await startConfigurationApp(appName, path);
    return herokuConfiguration;
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
