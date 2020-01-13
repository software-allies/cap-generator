const { exec } = require('promisify-child-process');

const herokuGitInit = async path => exec('git init', {cwd: `./${path}`});

const herokuGitAdd = async path => exec('git add .', {cwd: `./${path}`});

const herokuCommit = async path => exec('git commit -m "First commit"', {cwd: `./${path}`});

const herokuRemote = async path => exec('git remote -v', {cwd: `./${path}`});

const herokuDeploy = async path => exec(`heroku git:remote -a ${path}`, {cwd: `./${path}`});

// const herokuPush = async  path  => exec('git push heroku master', {cwd: `./${path}`});

async function  herokuPush (path) {
  const child = exec('git push heroku master', {cwd: `./${path}`});
  // child.stdout.on('data', (data) => console.log(data));
  child.stderr.on('data', (data) => console.log(data));
  const { stdout, stderr } = await child;
}

const herokuCLI = async (appName) => {
  try {
    await herokuGitInit(appName);

    await herokuGitAdd(appName);

    await herokuCommit(appName)

    await herokuRemote(appName);

    await herokuDeploy(appName);

    await herokuPush(appName);

    await herokuPush(appName);

  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  herokuCLI
};
