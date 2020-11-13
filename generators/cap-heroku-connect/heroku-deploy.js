const { exec } = require('promisify-child-process');

const herokuGitInit = async path => exec('git init', { cwd: `./${path}` });

const herokuGitAdd = async path => exec('git add .', { cwd: `./${path}` });

const herokuCommit = async path =>
  exec('git commit -m "First commit"', { cwd: `./${path}` });

const herokuRemote = async path => exec('git remote -v', { cwd: `./${path}` });

const herokuDeploy = async (path, appHeroku) =>
  exec(`heroku git:remote -a ${appHeroku}`, { cwd: `./${path}` });

async function herokuPush(path) {
  const child = exec('git push heroku master', { cwd: `./${path}` });
  child.stderr.on('data', data => console.log(data));
  const { stdout, stderr } = await child;
}

const confgVarsHeroku = async (path, herokuApp, key, value) =>
  exec(`heroku config:set ${key}=${value} -a ${herokuApp}`, { cwd: `./${path}` });

const herokuCLI = async (appName, appHeroku, variableKey ,variableValue, publishHerokuVar) => {
  try {

    if (publishHerokuVar) {
      await confgVarsHeroku(appName, appHeroku, variableKey, variableValue);
    }

    await herokuGitInit(appName);

    await herokuGitAdd(appName);

    await herokuCommit(appName);

    await herokuRemote(appName);

    await herokuDeploy(appName, appHeroku);

    await herokuPush(appName);
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  herokuCLI
};
