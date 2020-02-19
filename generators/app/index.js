var Generator = require('yeoman-generator');
var dasherize = require('underscore.string/dasherize');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);

      this.argument("appname", { type: String, required: false });
    }

    initializing() {
        // Paths definition
        this.destinationRoot('./projects')
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'list',
                name: 'projecttype',
                message: 'What do you want to create with CAP today?',
                choices: [
                    {
                        name: `A new CAP Angular App`,
                        value: 'new'
                    },
                    {
                        name: `A new feature for a existing CAP Angular App`,
                        value: 'update'
                    }
                ]
            },
            
            {
                type: "confirm",
                name: "appnew",
                message: "Please Confirm that you want to create a new Angular App",
                required: true,
                default: this.config.get("appnew") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "input",
                name: "appname",
                message: "Project name",
                default: this.options.appname || this.config.get("appname"),
                required: true,
                when: ctx =>  ctx.projecttype === 'new'
            },
            {
                type: "confirm",
                name: "appresponsive",
                message: "Would you like to add to your Angular App a Responsive feature, a Responsive Header Menu and a Home Module?",
                required: true,
                default: this.config.get("appresponsive") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "string",
                name: "appresponsivelogo",
                message: "Set the logo url for the header menu?",
                required: true,
                default: this.config.get("appresponsivelogo") || 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
                when: ctx => ctx.projecttype === 'new' && ctx.appresponsive === true
            },

            {
                type: "confirm",
                name: "appapi",
                message: "Would you like to add to your Angular App a API Service?",
                required: true,
                default: this.config.get("appapi") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "string",
                name: "appapiserver",
                message: "Which api domain should be used by the API Service?",
                required: true,
                default: this.config.get("appapiserver") || 'http://localhost:8080/api/v1',
                when: ctx => ctx.projecttype === 'new' && ctx.appapi === true
            },
            {
                type: "confirm",
                name: "appcache",
                message: "Would you like to add to your Angular App a Chache Http Interceptor?",
                required: true,
                default: this.config.get("appcache") || false,
                when: ctx => ctx.projecttype === 'new'
            },

            {
                type: "confirm",
                name: "appauth",
                message: "Would you like to add to your Angular App a Authentication Module?",
                required: true,
                default: this.config.get("appauth") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "list",
                name: "appauthservice",
                message: "Choose an authentication service",
                required: true,
                default: this.config.get("appauthservice") || false,
                choices: [
                    {
                        name: `Auth0`,
                        value: 'auth0'
                    },
                    {
                        name: `Firebase`,
                        value: 'firebase'
                    }
                ],
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true
            },
            {
                type: 'string',
                name: 'appauth0clientid',
                message: 'Set your Auth0 Client ID: ',
                default: this.config.get("appauth0clientid") || '***********',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthservice === 'auth0'
            },
            {
                type: 'string',
                name: 'appauth0clientsecret',
                message: 'Set your Auth0 Client Secret: ',
                default: this.config.get("appauth0clientsecret") || '***********',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthservice === 'auth0'
            },
            {
                type: 'string',
                name: 'appauth0domain',
                message: 'Set your Auth0 Domain: ',
                default: this.config.get("appauth0domain") || '***********',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthservice === 'auth0'
            },

            {
                type: "confirm",
                name: "appssr",
                message: "Would you like to add to your Angular App a SSR feature?",
                required: true,
                default: this.config.get("appssr") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "confirm",
                name: "appssrseo",
                message: "Would you like to add to your SSR Angular App a SEO service?",
                required: true,
                default: this.config.get("appssrseo") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.appssr === true
            },
            {
                type: "confirm",
                name: "appssrtransfer",
                message: "Would you like to add to your SSR Angular App a Transfer Http State Interceptor with Cache?",
                required: true,
                default: this.config.get("appssrtransfer") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.appssr === true
            },

            {
                type: "confirm",
                name: "apppwa",
                message: "Would you like to add to your Angular App a PWA feature?",
                required: true,
                default: this.config.get("apppwa") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "confirm",
                name: "apppwashell",
                message: "Would you like to add to your PWA Angular App a App-Shell feature?",
                required: true,
                default: this.config.get("apppwashell") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.apppwa === true
            },
            {
                type: "confirm",
                name: "apppwawebpush",
                message: "Would you like to add to your PWA Angular App a Web Push feature?",
                required: true,
                default: this.config.get("apppwawebpush") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.apppwa === true
            }

        ]);
        // Dasherize appname
        this.props.appname = dasherize(this.props.appname);
    }
    
    configuring() {

    }
    
    default() {

    }
    
    writing() {
        // Store user preferences
        Object.keys(this.props).map(option => {
            this.config.set(option, this.props[option]);
        });
    }
    
    conflicts() {

    }
    
    install() {

        // Install the Angular App
        if (this.props.appnew) {

            this.composeWith(require.resolve('../appnew'), {
                appname: this.props.appname ? this.props.appname : ''
            });

        } else {
            this.log('Do not continue with a Angular new app');
        }

        // Run the Angular Authentication Schematic
        if (this.props.appauth) {

            this.composeWith(require.resolve('../appauth'), {
                appname: this.props.appname ? this.props.appname : '',
                appauthservice: this.props.appauthservice ? this.props.appauthservice : '',
                appauth0clientid: this.props.appauth0clientid ? this.props.appauth0clientid : '',
                appauth0clientsecret: this.props.appauth0clientsecret ? this.props.appauth0clientsecret : '',
                appauth0domain: this.props.appauth0domain ? this.props.appauth0domain : ''
            });

        } else {
            this.log('Do not continue with Authentication feature');
        }

        // Run the Angular Responsive Schematic
        if (this.props.appresponsive) {

            this.composeWith(require.resolve('../appresponsive'), {
                appname: this.props.appname ? this.props.appname : '',
                appresponsivelogo: this.props.appresponsivelogo ? this.props.appresponsivelogo : ''
            });

        } else {
            this.log('Do not continue with Responsive feature installation');
        }
        
        // Run the Angular SSR Schematic
        if (this.props.appssr) {
            
            this.composeWith(require.resolve('../appssr'), {
                appname: this.props.appname ? this.props.appname : ''
            });

        } else {
            this.log('Do not continue with SSR feature installation');
        }
        
        // Install the Angular PWA Schematic
        if (this.props.apppwa) {

            this.composeWith(require.resolve('../apppwa'), {
                appname: this.props.appname ? this.props.appname : '',
                apppwashell: this.props.apppwashell ? this.props.apppwashell : '',
                apppwawebpush: this.props.apppwawebpush ? this.props.apppwawebpush : ''
            });

        } else {
            this.log('Do not continue with PWA feature installation');
        }
        
    }
    
    end() {

        // Run the Angular SSR Schematic
        if (this.props.appssr) {

            // Run App in SSR
            this.log(`\n=========================================\n
            Now lets to run the Angular Universal App
            \n==========================================`);

            this.spawnCommandSync('npm', ['run', 'build:ssr'], {cwd:  this.destinationPath(this.props.appname)});
            this.spawnCommandSync('npm', ['run', 'serve:ssr'], {cwd:  this.destinationPath(this.props.appname)});

        } else {
            this.log('Do not continue with SSR App Run');
        }
        
        this.log('Finish!');
    }
    
  };