# CAP Generator
<!-- [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] -->

> Connected App Platorm Generator (CAP Generator)

CAP generator creates and deploys web applications, just like creating backend applications from scratch linked with a heroku synchronizer to SalesForce platform easy and fast.


## **Previous requirements**

First, install [Yeoman](http://yeoman.io) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

You must also have Angular/CLI to build web applications (We recommend having version ^8 for greater compatibility and stability).

```bash
npm i -g @angular/cli@8.3.8
```

Depending on Operating system you must have installed a package manager.
* MacOS or Linux install [Brew](https://brew.sh/)
* Windows install [Chocolatey](https://chocolatey.org/install)

Note: To be able to use jq on Windows we recommend you check it the Unix tool on the [Adjusting your path environment](https://github.com/software-allies/cap-generator/blob/development/assets/git/git.png?raw=true) section. 

## Installation

Install generator-cap

```bash
npm install -g generator-cap
```

## Usage 

To generate a new project using CAP just run:

```bash
yo cap
```

It will prompt you a series of question regarding to your project

## Subgenerators
This generator automatically includes the sub generators based on the user answers. 
For more detail about how to use each module we recommend go through their documentation


| Module | Description |
| ------ | ------------ |
| [CAP STORAGE AWS](https://www.npmjs.com/package/cap-angular-schematic-storage-aws) | This module implements a connection with the Amazon Web Service server to upload files, images and videos to the provided account. |
| [CAP AUTHENTICATION](https://www.npmjs.com/package/cap-angular-schematic-auth-auth0) | This module implements a complete user authentication section for web application security (available for [Auth0](https://auth0.com/) and [Firebase](https://console.firebase.google.com/u/0/) services) |
| [CAP LIVE CHAT](https://www.npmjs.com/package/cap-angular-schematic-livechat) | This module implements a live chat service from the SalesForce service platform |
| [CAP SF CORE](https://www.npmjs.com/package/cap-angular-schematic-sfcore) | This module creates together with [Heroku Cloud](www.heroku.com) a back-end application with database and synchronization to a SalesForce company for data management. and also creates a CRUD to manipulate the data from the web application |
| [CAP SSR]() | This module adds a functionality to your SPA application so that it shows the source code to the google crawlers for a better search of your app within the google servers |
| [CAP PWA]() | This module implements a modality of your SPA application so that in some browsers you get direct access so that I take it as a native application of your computer or cell phone |

## License
Apache-2.0  © [Software Allies](https://www.softwareallies.com/)

<!-- 
[npm-image]: https://badge.fury.io/js/generator-cap.svg
[npm-url]: https://npmjs.org/package/generator-cap
[travis-image]: https://travis-ci.org//generator-cap.svg?branch=master
[travis-url]: https://travis-ci.org//generator-cap
[daviddm-image]: https://david-dm.org//generator-cap.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-cap
 -->
