const { exec } = require('promisify-child-process');
const https = require('https');
const opsys = process.platform;

let versionCommand = '';
let installJQCommand = '';
let jwtCommand = `curl -s 'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com' | jq '[ to_entries | .[] | {alg: "RS256", kty: "RSA", use: "sig", kid: .key, x5c: [(.value | sub(".*"; "") | sub("\n"; ""; "g") | sub("-.*"; "")) ] } ] | {"keys": .}'`;

const createJWTFirebase = async () => {
  try {
    let jwt = await exec(jwtCommand);
    let jsonJWT = JSON.stringify(JSON.parse(jwt.stdout));
    return jsonJWT;
  } catch (error) {
    console.log('error: ', error);
  }
};

const installJq = async command => {
  try {
    let installationStatus = await exec(command);
    if (installationStatus.stdout.includes('Already downloaded')) {
      createJWTFirebase();
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

const verifyJqVersion = async (versionCommand, installatioCommand) => {
  try {
    if (versionCommand === '') {
      installJq(installatioCommand);
    } else {
      let version = await exec(versionCommand);
      if (version.stdout !== '') {
        return createJWTFirebase();
      }
    }
  } catch (error) {
    let errorStatus = {
      code: error.code,
      message: error.stderr
    };
    installJq(installatioCommand);
    return errorStatus;
  }
};

if (opsys === 'darwin' || opsys === 'linux') {
  versionCommand = 'jq --version';
  installJQCommand = 'brew install jq';
  verifyJqVersion(versionCommand, installJQCommand);
} else {
  console.log('Windows');
  installJQCommand = 'npm i node-jq -g';
  versionCommand = '';
  verifyJqVersion(versionCommand, installJQCommand);
}
