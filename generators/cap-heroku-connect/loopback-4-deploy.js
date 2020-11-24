const Generator = require('yeoman-generator');
const astUtilities = require('../app/utils/AST-files');
const { exec } = require('promisify-child-process');
const loading = require('loading-cli');

let load = null;
let path = '';
let appName = '';
let deploy = {};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    path = opts.path;
    appName = opts.appName;
    deploy = opts.deploy;
  }

  async prompting() { }

  async writing() {
    try {
      // File.set('scripts.start', `node .`);
      let fileRoot = this.destinationPath(`${path}/package.json`);
      await astUtilities.astFunctions.editJSONFile(fileRoot, 'engines', {
        node: '~12.18.0',
        npm: '~6.14.4'
      });
      await astUtilities.astFunctions.editJSONFile(
        fileRoot,
        'scripts.start',
        'node index.js'
      );

      let currentDependencies = await astUtilities.astFunctions.getJSONObject(
        fileRoot,
        'dependencies'
      );
      await astUtilities.astFunctions.editJSONFile(fileRoot, 'dependencies', {
        ...currentDependencies,
        '@loopback/build': '^6.2.6',
        'source-map-support': '^0.5.19',
        '@loopback/testlab': '^3.2.8',
        '@types/node': '^10.17.44',
        '@loopback/eslint-config': '^10.0.2',
        eslint: '^7.12.1',
        typescript: '~4.0.5'
      });
      load.stop();
      load.succeed('Successfully preparation of the files');
    } catch (error) {
      load.stop();
      load.fail(error);
      console.log('error: ', error);
    }
  }

  async installDependencies() {
    try {
      load = loading('Installing dependencies'.blue).start();
      await exec('npm install', {
        cwd: this.destinationPath(path)
      });
      load.stop();
      load.succeed('Successfully installation');
    } catch (error) {
      load.stop();
      console.log('error: ', error);
      load.fail(error);
    }
  }

  async end() {
    try {
      load = loading('Configuring the variables'.blue).start();

      await exec(`heroku config:set ${deploy.key}=${deploy.value} -a ${appName}`, {
        cwd: this.destinationPath(path)
      });
      load.stop();
      load.succeed('Successfully configuration');

      await exec('npm run build', {
        cwd: this.destinationPath(path)
      });

      load = loading('Deploying application'.blue).start();
      await exec('git init', {
        cwd: this.destinationPath(path)
      });

      let gg = await exec('git add .', {
        cwd: this.destinationPath(path),
        maxBuffer: 2000 * 1024
      });
      console.log('gg: ', gg);

      await exec(`git commit -m "First commit"`, {
        cwd: this.destinationPath(path),
        maxBuffer: 2000 * 1024
      });

      await exec(`heroku git:remote -a ${appName}`, {
        cwd: this.destinationPath(path),
        maxBuffer: 2000 * 1024
      });

      let deployStatus = await exec('git push heroku master', {
        cwd: this.destinationPath(path),
        maxBuffer: 2000 * 1024
      });
      load.stop();
      load.succeed('Successfully deployment');
      this.log(`HEROKU DEPLOY STATUS`, deployStatus.stderr.toString());
    } catch (error) {
      load.stop();
      console.log('error: ', error);
      load.fail(error);
    }
  }
};
