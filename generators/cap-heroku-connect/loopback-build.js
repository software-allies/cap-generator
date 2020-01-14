const { exec } = require('promisify-child-process');

async function loopbackBuild (appName) {
  const child = exec(`lb ${appName} --skip-install`, { cwd: "" });
  child.stdout.on('data', (data) => child.stdin.write("\n") );
  child.stderr.on('data', (data) => {});
  const { stdout, stderr, code } = await child;
}

async function installLoopback () {
  const child = exec('npm install -g loopback-cli', {});
  child.stdout.on('data', (data) => console.log(data));
  child.stderr.on('data', (data) => console.log(data));
  const { stdout, stderr, code } = await child;
}

const loopbackCLI = async (appName, installation) => {
  try {
    if (installation) {
      await installLoopback();
    }
    await loopbackBuild(appName);
  } catch (error) {
    console.log('error: ', error);
  }
}

module.exports = {
  loopbackCLI
};
