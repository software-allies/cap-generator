let loadMessages = {
  herokuV: {
    actionMessage: 'Searching a Heroku CLI version...',
    responseMessage: 'Heroku CLI is already installed.',
    errorMessage: 'Heroku CLI is not installed.'
  },
  herokuC: {
    actionMessage: 'Searching a Heroku Connect plugin...',
    responseMessage: 'Heroku Connect is already installed.',
    errorMessage: 'Heroku Connect is not installed.'
  },
  herokuConnectIns: {
    actionMessage: 'Installing Heroku Connect plugin...',
    responseMessage: 'Heroku Connect was installed.',
    errorMessage: 'Error trying to install Heroku Connect plugin.'
  },
  checkUser: {
    actionMessage: 'Searching a user on Heroku...',
    responseMessage: 'An account was found',
    errorMessage: 'User not found'
  },
  login: {
    actionMessage: 'Login...',
    responseMessage: 'Successful login',
    errorMessage: 'Error trying to login.'
  },
  herokuCreateApp: {
    actionMessage: 'Creating app in Heroku...',
    responseMessage: 'The application was created.',
    errorMessage: 'Error trying to create Heroku App.'
  },
  herokuCreatePostgres: {
    actionMessage: 'Creating Postgres DB in Heroku app...',
    responseMessage: 'The BD on Postgres was created.',
    errorMessage: 'Error trying to create the DB on Postgres.'
  },
  herokuCredentials: {
    actionMessage: 'Getting the Heroku app credentials...',
    responseMessage: 'The credentials were saved.',
    errorMessage: 'Error trying to get the credentials.'
  },
  herokuConnectCreation: {
    actionMessage: 'Connection the Heroku app to Heroku Connect...',
    responseMessage: 'Successful Connection with Heroku Connect.',
    errorMessage: 'Error trying to connect the Heroku application with Heroku Connect.'
  },
  herokuConnectSetup: {
    actionMessage: 'Finishing the Heroku Connect configuration...',
    responseMessage: 'Successful Heroku configuration with Heroku Connect.',
    errorMessage:
      'Error trying to configurate the Heroku application with Heroku Connect.'
  },
  authConnection: {
    actionMessage: 'Authorizing the application...',
    responseMessage: 'Successful Auth.',
    errorMessage: 'Error trying to authorizing the application.'
  },
  tokenApplication: {
    actionMessage: 'Getting the application token...',
    responseMessage: 'The token was saved.',
    errorMessage: 'Error trying to get the application token.'
  },
  curlPost: {
    actionMessage: 'Linking the new add-on to your Heroku user account...',
    responseMessage:
      'The linking with the new add-on to your Heroku user account was added.',
    errorMessage: 'Error trying to linking the new add-on.'
  },
  schemaConnection: {
    actionMessage: 'Configure the database key and schema for the connection...',
    responseMessage: "Successful BD and Schema's configuration.",
    errorMessage: 'Error trying to configure the DB and the Schema.'
  },
  salesforceAuth: {
    actionMessage: 'Authenticate the connection to your Salesforce Org...',
    responseMessage: "Successful BD and Schema's configuration.",
    errorMessage: 'Error trying to configure the DB and the Schema.'
  },
  mapping: {
    actionMessage: 'Importing a mapping configuration...',
    responseMessage: 'Successful mapping.',
    errorMessage: 'Error trying to mapping.'
  }
};

module.exports = loadMessages;
