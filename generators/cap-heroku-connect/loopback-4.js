const Generator = require('yeoman-generator');
const astUtilities = require('../app/utils/AST-files');
const { exec } = require('promisify-child-process');
let path = '';
let credentials = {};
let appName = '';
let deploy = {};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    path = opts.path;
    credentials = opts.credentials;
    appName = opts.appName;
    deploy = opts.deploy;
  }

  async prompting() {}

  async writing() {
    try {
      let lb4Application = await this.spawnCommandSync(
        'lb4',
        [
          `${path}`,
          `--description=${path}`,
          `--outdir=${path}`,
          `--applicationName=${path}`,
          '--skip-install',
          '--yes'
        ],
        {
          cwd: this.destinationPath()
        }
      );
      if (lb4Application.status === 0) {
        // Copying the lb4 files related with Salesforce into the new lb4 application
        await this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/lb4/lb4-api/datasources/**'),
          this.destinationPath(`${path}/src/datasources`),
          {}
        );

        await this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/lb4/lb4-api/models/**'),
          this.destinationPath(`${path}/src/models`),
          {}
        );

        await this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/lb4/lb4-api/controllers/**'),
          this.destinationPath(`${path}/src/controllers`),
          {}
        );

        await this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/lb4/lb4-api/repositories/**'),
          this.destinationPath(`${path}/src/repositories`),
          {}
        );

        await this.fs.copyTpl(
          this.templatePath('cap-heroku-connect-api/lb4/lb4-api/index/**'),
          this.destinationPath(`${path}`),
          {}
        );
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async end() {
    try {
      astUtilities.astFunctions.replaceText(
        this.destinationPath(`${path}/src/controllers/index.ts`),
        `
export * from './ping.controller';
export * from './account.controller';
export * from './cap-file-c.controller';
export * from './cap-user-c.controller';
export * from './contact.controller';
export * from './lead.controller';
export * from './opportunity.controller';
// export * from './contact-account.controller';
export * from './account-contact.controller';
export * from './account-opportunity.controller';
export * from './cap-user-c-cap-file-c.controller';
        `
      );

      astUtilities.astFunctions.replaceText(
        this.destinationPath(`${path}/src/datasources/db.datasource.ts`),
        `
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'postgresql',
  url: '${credentials.url}',
  host: '${credentials.host}',
  port: ${credentials.port},
  user: '${credentials.user}',
  password: '${credentials.password}',
  database: '${credentials.db}',
  ssl: {rejectUnauthorized: false}
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
        `
      );

      await exec('npm install loopback-connector-postgresql --save', {
        cwd: this.destinationPath(path)
      });

      if (deploy.isDeployed) {
        this.composeWith(require.resolve('./loopback-4-deploy.js'), {
          path: path,
          appName,
          deploy
        });
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
};
