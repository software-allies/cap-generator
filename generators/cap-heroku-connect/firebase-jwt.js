const { exec } = require('promisify-child-process');

const color = require('colors-cli/toxic');
const loading = require('loading-cli');

const https = require('https');
const opsys = process.platform;

let versionCommand = `jq --version`;
let installJQCommand = 'brew install jq';

const jwtCommand = `curl -s 'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com' | jq '[ to_entries | .[] | {alg: "RS256", kty: "RSA", use: "sig", kid: .key, x5c: [(.value | sub(".*"; "") | sub("\n"; ""; "g") | sub("-.*"; "")) ] } ] | {"keys": .}'`;
const windowsCommand = `curl -s "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com" | jq "[ to_entries | .[] | {alg: ."RS256", kty: ."RSA", use: ."sig", kid: ."key", x5c: [(.value ) ] } ] | {"keys": "."}"`;

const createJWTFirebase = async () => {
  try {
    let jwt = await exec(jwtCommand);
    let jsonJWT = JSON.stringify(JSON.parse(jwt.stdout));
    return jsonJWT;
  } catch (error) {
    console.log('error: ', error);
  }
};

const createJwtWindows = async command => {
  try {
    let cmdWindows = await exec(command);
    let jsonT = JSON.parse(cmdWindows.stdout);
    jsonT.keys.forEach(element => {
      element.alg = 'RS256';
      element.kty = 'RSA';
      element.use = 'sig';

      let aux = [
        element.x5c[0]
          .split('\n')
          .slice(1, 18)
          .join('')
      ];
      element.x5c = aux;
    });
    return JSON.stringify(jsonT);
  } catch (error) {
    console.log('error trying to generate the jwt on windows: ', error);
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

const firebasePost = projectID => {
  return new Promise(async (resolve, reject) => {
    let load = loading('The application is generating the token'.blue).start();
    const options = {
      hostname: `${projectID}.firebaseio.com`,
      path: '/jwks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      load.succeed('The token was successfully generated.');
      res.on('data', d => {
        let credentialId = JSON.parse(JSON.stringify(JSON.parse(d)));
        resolve(credentialId.name);
      });
    });

    req.on('error', error => {
      console.error(error);
      load.stop();
      load.fail(`${error} `);
      reject(error);
    });

    if (opsys === 'darwin' || opsys === 'linux') {
      let data = await verifyJqVersion(versionCommand);
      req.write(data);
      req.end();
    } else {
      let data = await createJwtWindows(windowsCommand);
      req.write(data);
      req.end();
    }
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
