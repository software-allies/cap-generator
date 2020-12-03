const { exec } = require('promisify-child-process');
const loading = require('loading-cli');

let load = loading('Installing loopback 4');

const lb4Version = async () => {
  try {
    load = loading('Searching an lb4 version already installed');
    load.start();
    let lb4Version = await exec('lb4 -v');
    if (lb4Version.stderr === '') {
      load.stop();
      load.succeed('Loopback 4 is already installed.');
      return true;
    }
    return false;
  } catch (error) {
    load.stop();
    load.fail("There's not an lb4 version installed");
    return false;
  }
};

const lb4Installation = async () => {
  try {
    let existLb4 = await lb4Version();
    if (existLb4 !== true) {
      load = loading('Loopback 4 is installing...');
      load.start();
      await exec('npm i -g @loopback/cli');
      load.stop();
      load.succeed('Loopback 4 has been installed successfully');
    }
    return true;
  } catch (error) {
    load.stop();
    load.fail('Error trying to install lb4');
    return false;
  }
};
module.exports = lb4Installation;
