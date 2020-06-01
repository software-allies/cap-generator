const { exec } = require('promisify-child-process');
const opsys = process.platform;
const https = require('https');

// Windows
async function changeJSONResponse(jsonResponse) {
  let response = JSON.parse(jsonResponse.stdout);
  response.keys.forEach(element => {
    element.alg = 'RS256';
    element.kty = 'RSA';
    element.use = 'sig';
  });
  return response;
}

if (opsys === 'darwin' || opsys === 'linux') {
  console.log('linux');
} else {
  console.log('windows');
}
