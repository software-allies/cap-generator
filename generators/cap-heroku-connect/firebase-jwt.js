const { exec } = require('promisify-child-process');
// const request = require('request');
const https = require('https');

let versionCommand = `jq --version`;
let installJQCommand = 'brew install jq';
let jwtCommand = `curl -s 'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com' | jq '[ to_entries | .[] | {alg: "RS256", kty: "RSA", use: "sig", kid: .key, x5c: (.value | sub(".*"; "") | sub("\n"; ""; "g") | sub("-.*"; "")) } ] | {"keys": .}'`;

const createJWTFirebase = async () => {
  try {
    let jwt = await exec(jwtCommand);
    let jsonJWT = JSON.stringify(JSON.parse(jwt.stdout));
    return jsonJWT;
  } catch (error) {
    console.log('error: ', error);
  }
};

const installJq = async () => {
  try {
    let installationStatus = await exec(installJQCommand);
    if (installationStatus.stdout.includes('Already downloaded')) {
      createJWTFirebase();
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

const verifyJqVersion = async command => {
  try {
    let version = await exec(command);
    if (version.stdout !== '') {
      return createJWTFirebase();
    }
  } catch (error) {
    let errorStatus = {
      code: error.code,
      message: error.stderr
    };
    installJq();
    return errorStatus;
  }
};

// verifyJqVersion(versionCommand);
const firebasePost = projectID => {
  return new Promise(async (resolve, reject) => {
    const options = {
      hostname: `${projectID}.firebaseio.com`,
      path: '/jwks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      console.log(`+statusCode: ${res.statusCode}+`);
      res.on('data', d => {
        let credentialId = JSON.parse(JSON.stringify(JSON.parse(d)));
        resolve(credentialId.name);
      });
    });

    req.on('error', error => {
      console.error(error);
      reject(error);
    });

    let data = await verifyJqVersion(versionCommand);
    req.write(data);
    req.end();
  });
};

exports.getGoogleCredentials = async projectID => {
  try {
    let credentials = await firebasePost(projectID);
    return credentials;
  } catch (error) {
    console.log('error: ', error);
  }
};
