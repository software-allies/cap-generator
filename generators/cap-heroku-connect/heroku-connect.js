const { exec } = require('promisify-child-process');
let appName = '';

// Const verifyHeroku = async () => await exec(`heroku --version`);

// Const herokuInstallation = async () => await exec(`npm install -g heroku`);

// const login = async () => await exec('heroku login -i');

// const installHerokuC = async () => await exec('heroku plugins:install heroku-connect-plugin');

// Create a Heroku Application

const herokuCreate = async () => exec(`heroku apps:create ${appName}`);

// Create a Heroku postgresql database
const hrkCreatePostgreSql = async () =>
  exec(`heroku addons:create heroku-postgresql -a ${appName}`);

const hrkCredentials = async () =>
  exec(`heroku pg:credentials:url DATABASE_URL -a ${appName}`);

// Add Heroku connect into our Heroku application
const hrkConnect = async () => exec(`heroku addons:create herokuconnect -a ${appName}`);

// Finish the installation of Heroku connect and returns Heroku connect's URL
const setUpConnect = async command => exec(`${command}`);

const authConnection = async () =>
  exec(`heroku authorizations:create --description "For use with ${appName}"`);

// Returns a Heroku's token
const tokenApplication = async () => exec(`heroku auth:token`);

const curlPost = async token =>
  exec(
    `curl -X POST -H "Authorization: Bearer ${token}" https://hc-central.heroku.com/auth/${appName}`
  );

const schemaConnection = async () =>
  exec(`heroku connect:db:set --schema salesforce --db DATABASE_URL -a ${appName}`);

const createConnection = async () =>
  exec(`heroku connect:db:set --schema salesforce --db DATABASE_URL -a ${appName}`);

const salesforceAuth = async () => exec(`heroku connect:sf:auth -a ${appName}`);

const mapping = async () =>
  exec(`heroku connect:import cap-generator/heroku-config.json -a ${appName}`);

const herokuCLI = async name => {
  appName = name;
  try {
    let configuration = {};

    // =====================================================================================================================================================
    // Returns and object with the properties stdout and stderr
    // The stdout that contains the Heroku URL and the stderr that contains the status of the creation
    // Example:
    //  herokuApp: {
    //              stdout: 'https://yourherokuapp.herokuapp.com/ | https://git.heroku.com/yourherokuapp.git\n',
    //              stderr: 'Creating yourherokuapp... done\n'
    // }

    // =====================================================================================================================================================
    let herokuURL = await herokuCreate();
    let HerokuURLs = herokuURL.stdout.split('|');
    configuration.herokuURL = HerokuURLs[0];
    configuration.herokuGit = HerokuURLs[1];
    // Returns and object with the properties stdout and stderr
    // The stdout that contains the Heroku status and the stderr that contains the status of the creation
    // Example:
    //  dbHeroku: {
    //              stdout: 'Database has been created and is available\n ! This database is empty.
    //                      If upgrading, you can transfer\n ! data from another database with
    //                      pg:copy\nCreated postgresql-opaque-XXX as DATABASE_URL\n
    //                      Use heroku addons:docs heroku-postgresql to view documentation\n',
    //              stderr: 'Creating heroku-postgresql on yourherokuapp... free\n'
    // }

    // =====================================================================================================================================================
    await hrkCreatePostgreSql();

    // =====================================================================================================================================================
    let credentials = await hrkCredentials();
    let start = credentials.stdout.search('postgres');
    configuration.postgresURl = credentials.stdout.slice(
      start,
      credentials.stdout.length - 1
    );

    // =====================================================================================================================================================
    // Returns and object with the properties stdout and stderr
    // The stdout that contains the Heroku status and the next command to execute and finish the setup, also the stderr that contains the status of the creation
    // Example:
    //  dbHeroku: {
    //              stdout: 'Use `heroku addons:open herokuconnect-xxxxxxx-XXXXX -a yourherokuapp` to finish setup\n
    //                            Created herokuconnect-xxxxxx-XXXXX\n
    //                            Use heroku addons:docs herokuconnect to view documentation\n'
    //              stderr: 'Creating heroku-postgresql on yourherokuapp... free\n'
    // }

    // =====================================================================================================================================================
    let dbStatus = await hrkConnect();

    // =====================================================================================================================================================
    // Get the command to execute
    let nextHerokuCommand = dbStatus.stdout.split('`')[1];
    // Returns and object with the properties stdout and stderr
    // The stdout that contains a message that includes the heroku connect URL.
    // Example:
    //  herokuConnect: {
    //              stdout: 'Opening https://addons-sso.heroku.com/apps/fdf6dc7f-677c-4812-ab1e-c25d99504389/addons/d7642b8e-e461-449b-a740-d6af6554734e...\n'
    //              stderr: ''
    // }
    await setUpConnect(nextHerokuCommand);
    // =====================================================================================================================================================

    await authConnection();

    // =====================================================================================================================================================
    // Returns and object with the properties stdout and stderr
    // The stdout that contains a message that includes the heroku connect URL.
    // Example:
    //  herokuConnect: {
    //              stdout: 'your-token-that-was-generate\n'
    //              stderr: '›   Warning: token will expire 01/01/2021\n ›   Use heroku authorizations:create to generate a long-term token\n' ///Expiration of the token
    // }
    let token = await tokenApplication();
    await curlPost(token.stdout);

    // =====================================================================================================================================================
    // Returns the information of the application
    await schemaConnection();
    // =====================================================================================================================================================
    await salesforceAuth();
    // =====================================================================================================================================================
    await createConnection();
    // =====================================================================================================================================================
    await mapping();
    // =====================================================================================================================================================
    // Object that returns the function
    // urlDataBase: {
    // herokuURL: 'https://your-heroku-app.herokuapp.com/
    //  herokuGit: ' https://git.heroku.com/your-heroku-app.git\n',
    //  postgresURl:'your-postgres-url'
    // }
    return configuration;
  } catch (error) {
    console.log('error: ', error.stderr);
  }
};

module.exports = {
  herokuCLI
};
