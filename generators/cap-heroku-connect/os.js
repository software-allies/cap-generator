const { exec } = require('promisify-child-process');
const https = require('https');
const opsys = process.platform;
const loading = require('loading-cli');
const color = require('colors-cli/toxic');
let load = null;

let versionCommand = '';
let installJQCommand = '';
let jwtCommandWindows = `curl -X POST -d "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com"| jq '[ to_entries | .[] | {alg: "RS256", kty: "RSA", use: "sig", kid: .key, x5c: [(.value | sub(".*"; "") | sub("\n"; ""; "g") | sub("-.*"; "")) ] } ] | {"keys": .}'`;
let jwtCommand = `curl -s 'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com' | jq '[ to_entries | .[] | {alg: "RS256", kty: "RSA", use: "sig", kid: .key, x5c: [(.value | sub(".*"; "") | sub("\n"; ""; "g") | sub("-.*"; "")) ] } ] | {"keys": .}'`;

const createJWTFirebase = async () => {
  try {
    load = loading('Creating a JSON to Firebase auth...'.blue).start();
    let jwt;
    let jsonJWT;
    if (opsys === 'darwin' || opsys === 'linux') {
      jwt = await exec(jwtCommand);
      jsonJWT = JSON.stringify(JSON.parse(jwt.stdout));
      load.stop();
      load.succeed('The JSON was successful generated.');
    } else {
      jwt = await exec(jwtCommandWindows);
      jsonJWT = JSON.stringify(JSON.parse(jwt.stdout));
      load.stop();
      load.succeed('The JSON was successful generated.');
    }
    return jsonJWT;
  } catch (error) {
    console.log(error);
    load.stop();
    load.fail('Error trying to generate the JSON.');
    console.log('error: ', error);
  }
};

const installJq = async command => {
  try {
    load = loading('Installing jq...'.blue).start();
    let installationStatus = await exec(command);
    console.log(installationStatus);
    if (
      installationStatus.stdout.includes('Already downloaded') ||
      installationStatus.stdout.includes('Downloaded')
    ) {
      load.stop();
      load.succeed('Installation finished');
      createJWTFirebase();
    }
  } catch (error) {
    console.log(error);
    load.stop();
    load.fail('Error trying to install jq.');
    console.log('error: ', error);
  }
};

const verifyJqVersion = async (versionCommand, installatioCommand) => {
  try {
    if (versionCommand === '') {
      console.log('its a windows machine');

      installJq(installatioCommand);
    } else {
      let version = await exec(versionCommand);
      if (version.stdout !== '') {
        return createJWTFirebase();
      }
    }
  } catch (error) {
    console.log(error);
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
  installJQCommand = 'npm install node-jq -g';
  versionCommand = '';
  verifyJqVersion(versionCommand, installJQCommand);
}
