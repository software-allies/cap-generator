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

> For now all subgenerators works only with the main generator, not alone.
> Future release will have working this as completly standalone subgenerator

| Module | Subgenerator |
| ------ | ------------ |
| [CAP STORAGE AWS](https://www.npmjs.com/package/cap-angular-schematic-storage-aws) | `cap:cap-storage-aws` |
| [CAP AUTHENTICATION](https://www.npmjs.com/package/cap-angular-schematic-auth-auth0) | `cap:cap-authorization` |
| [CAP LIVE CHAT](https://www.npmjs.com/package/cap-angular-schematic-livechat) | `cap:cap-live-char`|
| [CAP SF CORE](https://www.npmjs.com/package/cap-angular-schematic-sfcore) | `cap:cap-heroku-connect` |
| [CAP SSR]() | `cap:cap-ssr` |
| [CAP PWA]() | `cap:cap-pwa` |
## Development

First, clone the project:

```bash
git clone https://github.com/software-allies/generator-cap

cd generator-cap
```

then install the dependencies and link the generator to use it globally in your system:

```bash
npm i && npm link
```

After that you should be able to run:

```bash
yo cap
```
> You need to have Yeoman installed globlaly in your computer


## Test

To run the test just run

```
npm test
```

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
