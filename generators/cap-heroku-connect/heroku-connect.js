const herokuService = require('./heroku-administrator');
const command = require('./exec-functions');
const loadMessages = require('./load-messages');

exports.herokuCLI = async (appName, path) => {
  try {
    await herokuService.run(command.herokuVersion, loadMessages.herokuV);

    await herokuService.run(command.herokuConnectVerification, loadMessages.herokuC);

    await herokuService.run(command.checkUser, loadMessages.checkUser);

    let herokuConfiguration = {};
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

    let credentials = await herokuService.run(
      command.herokuCredentials,
      loadMessages.herokuCredentials,
      appName
    );

    let startPosition = credentials.stdout.search('postgres');

    // DBURL it's going to save the url that it's going to be in Loopback
    const DBURL = credentials.stdout.slice(startPosition, credentials.stdout.length - 1);
    herokuConfiguration.postgresURL = DBURL;
    let dbstatus = await herokuService.run(
      command.herokuConnectCreation,
      loadMessages.herokuConnectCreation,
      appName
    );

    let commandetupConnect = dbstatus.stdout.split('`')[1];

    await herokuService.run(
      command.setUpConnect,
      loadMessages.herokuConnectSetup,
      commandetupConnect
    );
    // Let infoConnection = await run(command.authConnection, loadMessages.authConnection, appName)
    // Let startPositionC = infoConnection.stdout.search('ID') + 13
    // Let endPositionC = infoConnection.stdout.search('Description') - 1

    // var connection_id = infoConnection.stdout.slice(startPositionC, endPositionC);

    let token = await herokuService.run(
      command.tokenApplication,
      loadMessages.tokenApplication
    );

    let config = {
      name: appName,
      token: token.stdout
    };

    await herokuService.run(command.curlPost, loadMessages.curlPost, config);

    await herokuService.run(
      command.schemaConnection,
      loadMessages.schemaConnection,
      appName
    );

    await herokuService.run(command.salesforceAuth, loadMessages.salesforceAuth, appName);

    let map = {
      path: path,
      name: appName
    };
    // Await run(command.schemaConnection, loadMessages.schemaConnection, appName)
    await herokuService.run(command.mapping, loadMessages.mapping, map);
    return herokuConfiguration;
  } catch (error) {
    console.log('error: ', error);
    if (error.description === 'Heroku Connect is not installed') {
      await herokuService.run(
        command.herokuConnectInstallation,
        loadMessages.herokuConnectIns
      );
    }
    if (error.code === 100) {
      await herokuService.run(command.login, loadMessages.login);
    }

    if (error.code === 1) {
      let install = await herokuService.run(
        command.herokuInstallation,
        loadMessages.herokuCLIInstallation
      );

      console.log('install: ', install);
    }
  }
};
