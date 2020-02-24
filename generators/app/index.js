var Generator = require('yeoman-generator');
var dasherize = require('underscore.string/dasherize');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);

      this.argument("appName", { type: String, required: false });
    }

    initializing() {
        // Paths definition
        this.destinationRoot('./projects')
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'list',
                name: 'projectType',
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
                name: "appNew",
                message: "Please Confirm that you want to create a new Angular App",
                required: true,
                default: this.config.get("appNew") || false,
                when: ctx => ctx.projectType === 'new'
            },
            {
                type: "input",
                name: "appName",
                message: "Project Title",
                default: this.options.appName || this.config.get("appName"),
                required: true,
                when: ctx =>  ctx.projectType === 'new'
            },
            /* {
                type: "confirm",
                name: "appResponsive",
                message: "Would you like to add to your Angular App a Responsive feature, a Responsive Header Menu and a Home Module?",
                required: true,
                default: this.config.get("appResponsive") || false,
                when: ctx => ctx.projectType === 'new'
            }, */

            {
                type: "confirm",
                name: "appApi",
                message: "Would you like to add to your Angular App a API Service?",
                required: true,
                default: this.config.get("appApi") || false,
                when: ctx => ctx.projectType === 'new'
            },
            {
                type: "string",
                name: "appApiServer",
                message: "Which api domain should be used by the API Service?",
                required: true,
                default: this.config.get("appApiServer") || 'http://localhost:8080/api/v1',
                when: ctx => ctx.projectType === 'new' && ctx.appApi === true
            },
            {
                type: "confirm",
                name: "appCache",
                message: "Would you like to add to your Angular App a Chache Http Interceptor?",
                required: true,
                default: this.config.get("appCache") || false,
                when: ctx => ctx.projectType === 'new'
            },

            {
                type: "confirm",
                name: "appAuth",
                message: "Would you like to add to your Angular App a Authentication Module?",
                required: true,
                default: this.config.get("appAuth") || false,
                when: ctx => ctx.projectType === 'new'
            },
            {
                type: "list",
                name: "appAuthService",
                message: "Choose an authentication service",
                required: true,
                default: this.config.get("appAuthService") || false,
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
                when: ctx => ctx.projectType === 'new' && ctx.appAuth === true
            },
            {
                type: 'string',
                name: 'appAuth0ClientId',
                message: 'Set your Auth0 Client ID: ',
                default: this.config.get("appAuth0ClientId") || '***********',
                when: ctx => ctx.projectType === 'new' && ctx.appAuth === true && ctx.appAuthService === 'auth0'
            },
            {
                type: 'string',
                name: 'appAuth0ClientSecret',
                message: 'Set your Auth0 Client Secret: ',
                default: this.config.get("appAuth0ClientSecret") || '***********',
                when: ctx => ctx.projectType === 'new' && ctx.appAuth === true && ctx.appAuthService === 'auth0'
            },
            {
                type: 'string',
                name: 'appAuth0Domain',
                message: 'Set your Auth0 Domain: ',
                default: this.config.get("appAuth0Domain") || '***********',
                when: ctx => ctx.projectType === 'new' && ctx.appAuth === true && ctx.appAuthService === 'auth0'
            },
            {
                type: 'string',
                name: 'appAuth0EndPoint',
                message: 'Set your Auth0 Domain: ',
                default: this.config.get("appAuth0EndPoint") || '***********',
                when: ctx => ctx.projectType === 'new' && ctx.appAuth === true && ctx.appAuthService === 'auth0'
            },

            {
                type: "confirm",
                name: "appSSR",
                message: "Would you like to add to your Angular App a SSR feature?",
                required: true,
                default: this.config.get("appSSR") || false,
                when: ctx => ctx.projectType === 'new'
            },
            {
                type: "confirm",
                name: "appSSRSeo",
                message: "Would you like to add to your SSR Angular App a SEO service?",
                required: true,
                default: this.config.get("appSSRSeo") || false,
                when: ctx => ctx.projectType === 'new' && ctx.appSSR === true
            },
            {
                type: "confirm",
                name: "appSSRTransfer",
                message: "Would you like to add to your SSR Angular App a Transfer Http State Interceptor with Cache?",
                required: true,
                default: this.config.get("appSSRTransfer") || false,
                when: ctx => ctx.projectType === 'new' && ctx.appSSR === true
            },

            {
                type: "confirm",
                name: "appPWA",
                message: "Would you like to add to your Angular App a PWA feature?",
                required: true,
                default: this.config.get("appPWA") || false,
                when: ctx => ctx.projectType === 'new'
            },
            {
                type: "confirm",
                name: "appPWAShell",
                message: "Would you like to add to your PWA Angular App a App-Shell feature?",
                required: true,
                default: this.config.get("appPWAShell") || false,
                when: ctx => ctx.projectType === 'new' && ctx.appPWA === true
            },
            {
                type: "confirm",
                name: "appPWAWebPush",
                message: "Would you like to add to your PWA Angular App a Web Push feature?",
                required: true,
                default: this.config.get("appPWAWebPush") || false,
                when: ctx => ctx.projectType === 'new' && ctx.appPWA === true
            }

        ]);

        // Set default options
        this.props.appName = dasherize(this.props.appName);
        this.props.appTitle = this.props.appName;
        this.props.appResponsive = true;
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
        if (this.props.appNew) {

            this.composeWith(require.resolve('../app-new'), {
                appName: this.props.appName ? this.props.appName : ''
            });

        } else {
            this.log('Do not continue with a Angular new app');
        }

        // Run the Angular Authentication Schematic
        if (this.props.appAuth) {

            this.composeWith(require.resolve('../app-auth'), {
                appName: this.props.appName ? this.props.appName : '',
                appAuthService: this.props.appAuthService ? this.props.appAuthService : '',
                appAuth0ClientId: this.props.appAuth0ClientId ? this.props.appAuth0ClientId : '',
                appAuth0ClientSecret: this.props.appAuth0ClientSecret ? this.props.appAuth0ClientSecret : '',
                appAuth0Domain: this.props.appAuth0Domain ? this.props.appAuth0Domain : '',
                appAuth0EndPoint: this.props.appAuth0EndPoint ? this.props.appAuth0EndPoint : ''
            });

        } else {
            this.log('Do not continue with Authentication feature');
        }

        // Run the Angular Responsive Schematic
        if (this.props.appResponsive) {

            this.composeWith(require.resolve('../app-responsive'), {
                appName: this.props.appName ? this.props.appName : '', // project name (dasherized)
                appTitle: this.props.appTitle ? this.props.appTitle : '', // Title for the app
                appResponsivelogo: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png', // logo for header menu
                removeAppComponentHtml: true, // Remove index content
                auth: true, // Include Authentication options on menu
                installAuth: false // Install cap-angular-schematic-auth-auth0
            });

        } else {
            this.log('Do not continue with Responsive feature installation');
        }
        
        // Run the Angular SSR Schematic
        if (this.props.appSSR) {
            
            this.composeWith(require.resolve('../app-ssr'), {
                appName: this.props.appName ? this.props.appName : ''
            });

        } else {
            this.log('Do not continue with SSR feature installation');
        }
        
        // Install the Angular PWA Schematic
        if (this.props.appPWA) {

            this.composeWith(require.resolve('../app-pwa'), {
                appName: this.props.appName ? this.props.appName : '',
                appPWAShell: this.props.appPWAShell ? this.props.appPWAShell : '',
                appPWAWebPush: this.props.appPWAWebPush ? this.props.appPWAWebPush : ''
            });

        } else {
            this.log('Do not continue with PWA feature installation');
        }
        
    }
    
    end() {

        // Run the Angular App server
        if (this.props.appNew && !this.props.appSSR) {

            // Run App in SSR
            this.log(`\n=========================================\n
            Now lets to run the Angular App
            \n==========================================`);

            this.spawnCommandSync('ng', ['serve', '-o'], { cwd:  this.destinationPath(this.props.appName) });

        } else if (this.props.appPWAShell && !this.props.appSSR) {
        // Run the Angular SSR Schematic

            // Run App in SSR
            this.log(`\n=========================================\n
            Now lets to run the Angular PWA App
            \n==========================================`);

            this.spawnCommandSync('npm', ['run', 'app-shell'], { cwd:  this.destinationPath(this.props.appName) });

        } else if (this.props.appSSR) {
            // Run the Angular SSR Schematic
    
            // Run App in SSR
            this.log(`\n=========================================\n
            Now lets to run the Angular Universal App
            \n==========================================`);

            this.spawnCommandSync('npm', ['run', 'build:ssr'], { cwd:  this.destinationPath(this.props.appName) });
            this.spawnCommandSync('npm', ['run', 'serve:ssr'], { cwd:  this.destinationPath(this.props.appName) });
    
        } else {
            this.log('Do not continue with App Run');
        }
        
        this.log('Finish!');
    }
    
  };