const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';
require('dotenv').config();
const envConfigFileProd = `export const environment = {
  <% if (auth === 'auth0') { %>
  clientId: '${process.env.AUTH0_CLIENT_ID}',
  clientSecret: '${process.env.AUTH0_CLIENT_SECRET}',
  domain: '${process.env.AUTH0_DOMAIN}',
  <% }else{ %>apiKey: '${process.env.FIREBASE_API_KEY}',
  authDomain: '${process.env.FIREBASE_DOMAIN}',
  databaseURL: '${process.env.FIREBASE_DATABASE}',
  projectId: '${process.env.FIREBASE_PROJECT_ID}',
  storageBucket: '${process.env.FIREBASE_BUCKET}',
  messagingSenderId: '${process.env.FIREBASE_SENDER_ID}',
  appId: '${process.env.FIREBASE_APP_ID}',
  measurementId: '${process.env.FIREBASE_MEASUREMENT}',
  <% } %><% if (modules.find(x => x.name === 'cap-live-chat')) { -%>
  embeddedServiceName: '${process.env.LIVECHAT_SERVICE_NAME}',
  idServiceName: '${process.env.LIVECHAT_SERVICE_NAME_ID}',
  urlSandbox: '${process.env.LIVECHAT_URL_SANDBOX}',
  urlDomain: '${process.env.LIVECHAT_URL_DOMAIN}',
  baseLiveAgentContentURL: '${process.env.LIVECHAT_BASE_LIVE_AGENT_CONTENT_URL}',
  deploymentId: '${process.env.LIVECHAT_DEPLOYMENT_ID}',
  buttonId: '${process.env.LIVECHAT_BUTTON_ID}',
  baseLiveAgentURL: '${process.env.LIVECHAT_BASE_LIVE_AGENT_URL}',
  scriptUrl: '${process.env.LIVECHAT_SCRIPT_URL}',
  eswLiveAgentDevName: '${process.env.LIVECHAT_LIVE_AGENT_DEV_NAME}',
  <% } %><% if (modules.find(x => x.name === 'cap-storage-aws')) { -%>
  bucket: '${process.env.AWS_BUCKET}',
  accessKeyId: '${process.env.AWS_ACCESS_KEY_ID}',
  secretAccessKey: '${process.env.AWS_SECRET_ACCESS_KEY}',
  region: '${process.env.AWS_REGION}',
  folder: '${process.env.AWS_FOLDER}',
  <% } %><% if (modules.find(x => x.name === 'cap-heroku-connect')) { -%>
  sfApiUrl: '${process.env.API_URL}',<% } %>
  production: true,
  apiUrl: ''
};
`;
fs.writeFile(targetPath, envConfigFileProd,
  function (err) {
   if (err) {
      throw console.error(err);
   } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});
