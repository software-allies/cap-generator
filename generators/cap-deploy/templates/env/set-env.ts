const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';
require('dotenv').load();
const envConfigFile = `export const environment = {
  apiUrl: 'http://mydomain.com/api/',
  production: true,
  clientId: '${process.env.CLIENT_ID}',
  clientSecret: '${process.env.CLIENT_SECRET}',
  domain: '${process.env.AUTH_DOMAIN}'
};
`;
console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
fs.writeFile(targetPath, envConfigFile,
  function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
   }
});
