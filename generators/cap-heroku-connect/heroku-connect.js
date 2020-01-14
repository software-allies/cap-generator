// Const verifyHeroku = async () => await exec(`heroku --version`);

// Const herokuInstallation = async () => await exec(`npm install -g heroku`);

// const login = async () => await exec('heroku login -i');

// const installHerokuC = async () => await exec('heroku plugins:install heroku-connect-plugin');

// Create a Heroku Application

// const herokuScript = require('./script')
const { run } = require('./heroku-administrator');
const commands = require('./exec-functions');
const loadMessages = require('./load-messages');

// Checking the Heroku version
exports.herokuCLI = async (appName, path) => {
  console.log('path: ', path);
  console.log('appName: ', appName);
  try {
    await run(commands.herokuVersion, loadMessages.herokuV);

    await run(commands.herokuConnectVerification, loadMessages.herokuC);

    let herokuConfiguration = {};
    let urls = await run(commands.herokuCreateApp, loadMessages.herokuCreateApp, appName);
    let herokUrls = urls.stdout.split('|');
    herokuConfiguration.herokuURL = herokUrls[0];
    herokuConfiguration.herokuGit = herokUrls[1];

    await run(commands.hrkCreatePostgreSql, loadMessages.herokuCreatePostgres, appName);

    let credentials = await run(
      commands.herokuCredentials,
      loadMessages.herokuCredentials,
      appName
    );

    let startPosition = credentials.stdout.search('postgres');
    // DBURL it's going to save the url that it's going to be in Loopback
    const DBURL = credentials.stdout.slice(startPosition, credentials.stdout.length - 1);
    herokuConfiguration.postgresURl = DBURL;
    let dbstatus = await run(
      commands.herokuConnectCreation,
      loadMessages.herokuConnectCreation,
      appName
    );

    let commandSetupConnect = dbstatus.stdout.split('`')[1];

    await run(
      commands.setUpConnect,
      loadMessages.herokuConnectSetup,
      commandSetupConnect
    );
    // Let infoConnection = await run(commands.authConnection, loadMessages.authConnection, appName)
    // Let startPositionC = infoConnection.stdout.search('ID') + 13
    // Let endPositionC = infoConnection.stdout.search('Description') - 1

    // var connection_id = infoConnection.stdout.slice(startPositionC, endPositionC);

    let token = await run(commands.tokenApplication, loadMessages.tokenApplication);

    let config = {
      name: appName,
      token: token.stdout
    };

    await run(commands.curlPost, loadMessages.curlPost, config);

    await run(commands.schemaConnection, loadMessages.schemaConnection, appName);

    await run(commands.salesforceAuth, loadMessages.salesforceAuth, appName);

    let map = {
      path: path,
      name: appName
    };
    // Await run(commands.schemaConnection, loadMessages.schemaConnection, appName)
    await run(commands.mapping, loadMessages.mapping, map);
    return herokuConfiguration;
  } catch (error) {
    console.log('error: ', error);
    if (error.description === 'Heroku Connect is not installed') {
      await run(commands.herokuConnectInstallation, loadMessages.herokuConnectIns);
    }
  }
};
