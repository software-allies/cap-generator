'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('', () => {
  /*const files = [
    'apiTest/server',
    'apiTest/server/boot',
    'apiTest/server/boot/authentication.js',
    'apiTest/server/boot/root.js',
    'apiTest/server/component-config.json',
    'apiTest/server/config.json',
    'apiTest/server/datasources.json',
    'apiTest/server/middleware.development.json',
    'apiTest/server/middleware.json',
    'apiTest/server/model-config.json',
    'apiTest/package.json',
    'apiTest/README.md'
  ]*/

  beforeAll(() => {
    /*const answers = {
      type: 'api',
      name: 'apiTest',
      modules: []
    }
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);*/
  });

  /*it('Should create all the files needed for the API', () => {
    assert.file(files);
  });*/
});

describe('', () => {
  const appName = 'clientTest'

  /*const files = [
    `${appName}/resources`,
    `${appName}/resources/android`,
    `${appName}/resources/ios`,
    `${appName}/resources/icon.png`,
    `${appName}/resources/README.md`,
    `${appName}/resources/splash.png`,
    `${appName}/src`,
    `${appName}/src/app`,
    `${appName}/src/assets`,
    `${appName}/src/pages`,
    `${appName}/src/theme`,
    `${appName}/src/index.html`,
    `${appName}/src/manifest.json`,
    `${appName}/src/service-worker.js`,
    `${appName}/config.xml`,
    `${appName}/ionic.config.json`,
    `${appName}/package.json`,
    `${appName}/tsconfig.json`,
    `${appName}/tslint.json`
  ]*/

  /*const authModuleFiles = [
    `${appName}/src/pages/change-password`,
    `${appName}/src/pages/change-password/change-password.html`,
    `${appName}/src/pages/change-password/change-password.module.ts`,
    `${appName}/src/pages/change-password/change-password.scss`,
    `${appName}/src/pages/change-password/change-password.ts`,
    `${appName}/src/pages/login/login.html`,
    `${appName}/src/pages/login/login.module.ts`,
    `${appName}/src/pages/login/login.scss`,
    `${appName}/src/pages/login/login.ts`,
    `${appName}/src/pages/register/register.html`,
    `${appName}/src/pages/register/register.module.ts`,
    `${appName}/src/pages/register/register.scss`,
    `${appName}/src/pages/register/register.ts`
  ]*/

  /*const awsModuleFiles = [
    `${appName}/src/pages/photo-list`,
    `${appName}/src/pages/photo-list/photo-list.html`,
    `${appName}/src/pages/photo-list/photo-list.module.ts`,
    `${appName}/src/pages/photo-list/photo-list.scss`,
    `${appName}/src/pages/photo-list/photo-list.ts`,
    `${appName}/src/pages/photo-upload/photo-upload.html`,
    `${appName}/src/pages/photo-upload/photo-upload.module.ts`,
    `${appName}/src/pages/photo-upload/photo-upload.scss`,
    `${appName}/src/pages/photo-upload/photo-upload.ts`
  ]*/

  /*it('Should create all the files needed for the CLIENT app without extra modules', (done) => {
    const answers = {
      type: 'client',
      name: appName,
      modules: []
    }

    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .then(dir => {
        assert.file(files);
        assert.noFile(authModuleFiles);
        assert.noFile(awsModuleFiles);
        done()
      })
  });*/

  /*it('Should create and configure all the files for the client app and the Auth Module only.', (done) => {
    const answers = {
      type: 'client',
      name: appName,
      modules: [{
        name: 'cap-authorization',
        version: '0.0.2'
      }],
      authApiUrl: 'http:localhost:3000/api',
      authLoginEndPoint: 'users'
    }
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .then(dir => {
        assert.file(files);
        assert.file(authModuleFiles);
        assert.noFile(awsModuleFiles);
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("apiUrl: '" + answers.authApiUrl + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("loginEndpoint: '" + answers.authLoginEndPoint + "'"));
        done()
      })
  });*/

  /*it('Should create and configure all the files for the client app and AWS Storage Module only.', (done) => {
    const answers = {
      type: 'client',
      name: appName,
      modules: [{
        name: 'cap-storage-aws',
        version: '1.0.1'
      }],
      awsBucket: 'testAwsBucket',
      awsAccessKeyId: 'testAwsKey',
      awsSecretAccessKey: 'testAwsSecretKey',
      awsRegion: 'testAwsRegion',
      awsFolder: 'testAwsFolder'
    }
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .then(dir => {
        assert.file(files);
        assert.file(awsModuleFiles);
        assert.noFile(authModuleFiles);
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("bucket: '" + answers.awsBucket + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("accessKeyId: '" + answers.awsAccessKeyId + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("secretAccessKey: '" + answers.awsSecretAccessKey + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("region: '" + answers.awsRegion + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("folder: '" + answers.awsFolder + "'"));
        done()
      })
  });*/

  /*it('Should create all the files for the client app, AWS Storage Module and Auth Module.', (done) => {
    const answers = {
      type: 'client',
      name: appName,
      modules: [
        {
          name: 'cap-storage-aws',
          version: '1.0.1'
        },
        {
          name: 'cap-authorization',
          version: '0.0.2'
        }
      ],
      authApiUrl: 'http:localhost:3000/api',
      authLoginEndPoint: 'users',
      awsBucket: 'testAwsBucket',
      awsAccessKeyId: 'testAwsKey',
      awsSecretAccessKey: 'testAwsSecretKey',
      awsRegion: 'testAwsRegion',
      awsFolder: 'testAwsFolder'
    }
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .then(dir => {
        assert.file(files);
        assert.file(awsModuleFiles);
        assert.file(authModuleFiles);
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("apiUrl: '" + answers.authApiUrl + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("loginEndpoint: '" + answers.authLoginEndPoint + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("bucket: '" + answers.awsBucket + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("accessKeyId: '" + answers.awsAccessKeyId + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("secretAccessKey: '" + answers.awsSecretAccessKey + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("region: '" + answers.awsRegion + "'"));
        assert.fileContent(`${appName}/src/app/app.module.ts`, new RegExp("folder: '" + answers.awsFolder + "'"));
        done()
      })
  });*/
});
