const herokuService = require('./heroku-administrator');
const command = require('./exec-functions');
const loadMessages = require('./load-messages');
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

      case 400:
        await herokuService.run(
          command.herokuConnectInstallation,
          loadMessages.herokuConnectIns
        );
        await herokuService.run(command.login, loadMessages.login);
        break;

      default:
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

const numberApps = async () => {
  // try {
  // let appsString = await herokuService.run(command.herokuApps, loadMessages.herokuApps);
  // console.log('appsString: ', appsString);
  // let appsName = appsString.stdout.split('\n');

  // let apps = [];
  // appsName.forEach(name => {
  //   if (name === '' || name.includes('===') === true || ) { }
  //   else {
  //     apps.push({
  //       title: name,
  //       value: name
  //     });
  //   }
  // });
  // if (apps.length >= 5) {
  // Feature to remove a Heroku Application
  // const response = await prompts({
  //   type: 'toggle',
  //   name: 'value',
  //   message:
  //     "You have the free version of Heroku and you can't create more than 5 apps, would you like to remove someone of them?",
  //   initial: false,
  //   active: 'YES',
  //   inactive: 'NO'
  // });

  // if (response.value) {
  //   const appToDelete = await prompts({
  //     type: 'select',
  //     name: 'value',
  //     message: 'Select the application to delete: ',
  //     choices: [...apps],
  //     initial: 1
  //   });
  //   let deleteResponse = await herokuService.run(
  //     command.deleteApp,
  //     loadMessages.deleteApp,
  //     appToDelete.value
  //   );
  //   return deleteResponse;
  // }
  //   let situation = {
  //     message:
  //       'You have too many apps for your free account, please upgrade or remove from apps',
  //     apps
  //   };
  //   return situation;
  // }
  // return 'CONTINUES';
  // } catch (error) {
  //   console.log('error: ', error);
  // }
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
    // let numResponse = await numberApps();
    let newName = await appsCreation(appName);
    herokuConfiguration.appName= newName;
    if (newName.code === 1) {
      throw new Error({ ...newName });
    } else {
      // if (numResponse === 'CONTINUES') {
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
