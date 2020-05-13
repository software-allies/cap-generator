const Parser = require('ts-simple-ast').default;
let datasource = '';

async function removeUnnecessaryCode (destinationPath) {
  const tsParserModelConfig = new Parser();
  tsParserModelConfig.addExistingSourceFile(`${destinationPath}/server/model-config.json`);
  const fileModelConfig = tsParserModelConfig.getSourceFile(`${destinationPath}/server/model-config.json`);
  fileModelConfig.removeText(fileModelConfig.getPos(), fileModelConfig.getEnd());
  fileModelConfig.saveSync();

  const tsParserAuth = new Parser();
  tsParserAuth.addExistingSourceFile(`${destinationPath}/server/boot/authentication.js`);
  const fileDelete = tsParserAuth.getSourceFile(`${destinationPath}/server/boot/authentication.js`);
  fileDelete.removeText(fileDelete.getPos(), fileDelete.getEnd());
  fileDelete.saveSync();
}

async function datasourceConfig (destinationPath, datasource, deploy) {
  const tsParseDB = new Parser();
  tsParseDB.addExistingSourceFile(`${destinationPath}/server/datasources.json`);
  const fileDB = tsParseDB.getSourceFile(`${destinationPath}/server/datasources.json`);
  // const dataSource = /"connector": "memory"/g;
  /*const newTextDB = fileDB.getText().replace(dataSource,
  `"url": "${deploy ? '' : datasource}?ssl=true",
  "connector": "postgresql"`);*/
  fileDB.removeText(fileDB.getPos(), fileDB.getEnd());
  fileDB.insertText(0, `{}`);
  fileDB.save();
}

async function middlewareAuth (destinationPath) {
  const tsParseAuth = new Parser();
  tsParseAuth.addExistingSourceFile(`${destinationPath}/server/middleware.json`);
  const fileAuth = tsParseAuth.getSourceFile(`${destinationPath}/server/middleware.json`);
  const authMiddleware = /"auth": {},/g;
  const restApiRoot = "${restApiRoot}";
  const newTextAuth = fileAuth.getText().replace(authMiddleware,
`"auth": {
  "./auth.js":{
      "paths": [
        "${restApiRoot}"
      ]
    }
  },`);
  fileAuth.removeText(fileAuth.getPos(), fileAuth.getEnd());
  fileAuth.insertText(0, newTextAuth);
  fileAuth.saveSync();
}

async function packageDependencies (destinationPath) {
  const tsParseDependencies = new Parser();
  tsParseDependencies.addExistingSourceFile(`${destinationPath}/package.json`);
  const fileDependencies = tsParseDependencies.getSourceFile(`${destinationPath}/package.json`);
  const dependencies = /"dependencies": {/g;
  const newTextDependencies = fileDependencies.getText().replace(dependencies,
  `"dependencies": {
    "express-jwt": "^5.3.1",
    "jwks-rsa": "^1.6.0",
    "loopback-connector-postgresql": "^3.8.1",`);
  fileDependencies.removeText(fileDependencies.getPos(), fileDependencies.getEnd());
  fileDependencies.insertText(0, newTextDependencies);
  fileDependencies.saveSync();
}

async function ModelConfig  (destinationPath) {
  const tsParserModelConfig = new Parser();
  tsParserModelConfig.addExistingSourceFile(`${destinationPath}/server/model-config.json`);
  const fileModelConfig = tsParserModelConfig.getSourceFile(`${destinationPath}/server/model-config.json`);
  fileModelConfig.insertText(0,
`{
  "_meta": {
  "sources": [
    "loopback/common/models",
    "loopback/server/models",
    "../common/models",
    "./models"
  ],
  "mixins": [
    "loopback/common/mixins",
    "loopback/server/mixins",
    "../common/mixins",
    "./mixins"
  ]
  },
  "Lead": {
    "dataSource": "heroku",
    "public": true
  },
  "Account": {
    "dataSource": "heroku",
    "public": true
  },
  "Contact": {
    "dataSource": "heroku",
    "public": true
  },
  "Opportunity": {
    "dataSource": "heroku",
    "public": true
  },
  "CapUserC": {
    "dataSource": "heroku",
    "public": true
  },
  "CapFileC": {
    "dataSource": "heroku",
    "public": true
  }
}`);
  fileModelConfig.saveSync();
}

const loopbackConfiguration = async (appName, destinationPath, datasource, deploy) => {
  datasource = datasource;
  try {

    await removeUnnecessaryCode(destinationPath);

    await datasourceConfig(destinationPath, datasource, deploy);

    await middlewareAuth(destinationPath);

    await packageDependencies(destinationPath);

    await ModelConfig(destinationPath);

  } catch (error) {
    console.log('error: ', error);
  }
}

module.exports = {
  loopbackConfiguration
};
