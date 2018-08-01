# CAP Generator
<!-- [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] -->

> Connected App Platorm Generator (CAP Generator)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cap using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
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

> For now all subgenerators works only if you use the main generator which will ask the information the subgenerator needs to work correctly.
> Future release will have working this as completly standalone subgenerator

| Module | Subgenerator |
| ------ | ------------ |
| [CAP STORAGE AWS](https://www.npmjs.com/package/cap-storage-aws) | `cap:cap-storage-aws` |
| [CAP AUTHORIZATION](https://www.npmjs.com/package/cap-authorization) | `cap:cap-authorization` |

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

## License

MIT © [Software Allies](https://www.softwareallies.com/)

<!-- 
[npm-image]: https://badge.fury.io/js/generator-cap.svg
[npm-url]: https://npmjs.org/package/generator-cap
[travis-image]: https://travis-ci.org//generator-cap.svg?branch=master
[travis-url]: https://travis-ci.org//generator-cap
[daviddm-image]: https://david-dm.org//generator-cap.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-cap
 -->
