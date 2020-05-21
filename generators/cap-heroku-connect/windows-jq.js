const { exec } = require('promisify-child-process');

async function testingC() {

  // let commando = await exec(`curl -s "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com" | jq "[ to_entries | .[] | {alg: ."RS256", kty: ."RSA", use: ."sig", kid: ."key", x5c: [(.value | split(\"-----BEGIN CERTIFICATE-----\") ) ] } ] | {"keys": .}"`)
  let commando = await exec(` curl -s "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com" | jq "[ to_entries | .[] | {alg: ."RS256", kty: ."RSA", use: ."sig", kid: ."key", x5c: [(.value ) ] } ] | {"keys": "."}"`)
  return commando
}

testingC()
  .then(async res => {
    let response = await JSON.parse(res.stdout);
    console.log(response, 'response')
    response.keys.forEach(element => {
      element.alg = 'RS256';
      element.kty = 'RSA';
      element.use = 'sig';
      element.x5c = element.x5c[0].split("\n").slice(1, 18).join("");
    });
    console.log(response)
  })
  .catch(err => {
    console.log(err);
  });
