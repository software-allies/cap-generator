# CAP Generator
<!-- [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] -->

> Connected App Platorm Generator (CAP Generator)

CAP is an open-source suite of technologies for rapidly creating web and mobile applications that synchronize data with Salesforce and other systems. The CAP SDK (Software Development Kit) gives users the tools needed to quickly generate applications that can be fully customized. 

**Why CAP?** Creating external connected applications to CRMs, ERPs and other external systems is involved and time consuming to build. CAP quickly generates the initial setup and creation of complex components like authorization, files and synchronization through an easy  to use CAP CLI (Command Line Interface).


## **Previous requirements**

First, install [Yeoman](http://yeoman.io) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

You must also have Angular/CLI to build web applications (We recommend having version ^8 for greater compatibility and stability).

```bash
npm i -g @angular/cli
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

```
     _-----_     ╭──────────────────────────╮
    |       |    │       CAP Generator      │
    |--(o)--|    │    Build amazing apps    │
   `---------´   │     faster and better    │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? What's the name of your application? front-end
? Choose an authentication service: Firebase
  Auth0 
❯ Firebase

? Set your ApiKey:  
? Set your Auth Domain:  
? Set your data base URL:  
? Set your Project ID:  
? Set your storage bucket:  
? Set your message sender ID:  
? Set your app ID:  
? Set your measurement ID: 

? Select the modules you want to include:
❯◯ CAP-Storage-AWS-Module
 ◯ CAP-Live-Chat
 ◯ CAP-SSR
 
? Do you want your app to work like PWA (Progressive Web Application)? Yes
? Do you want to deploy your application in Heroku? Yes
? Do you want to use a synchronization/API service? Yes

? Heroku email 
? Heroku password [hidden]
```
**Note** In the question `Do you want to deploy your application in Heroku?` you must have a heroku account created and if it is possible to install [Heroku/CLI](https://devcenter.heroku.com/articles/heroku-cli).  Contact us at sales@softwareallies.com for more information or auxiliary for better performance.

**Note**: in the last question `? Do you want to use a synchronization/API service?` you must have a partnership in SalesForce so that you can synchronize your data to a database in conjunction with HerokuConnect. Contact us at sales@softwareallies.com for more information or auxiliary for better performance.

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
