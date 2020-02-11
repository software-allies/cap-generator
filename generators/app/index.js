var Generator = require('yeoman-generator');
var dasherize = require('underscore.string/dasherize');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);

      this.argument("appname", { type: String, required: false });
    }

    initializing() {
        // Paths definition
        this.destinationRoot('.')
        this.log('this.destinationRoot()', this.destinationRoot());
        this.log('this.destinationPath()', this.destinationPath());


        // this.composeWith(require.resolve('../appnew'));

    }

    async prompting() {
        this.answers = await this.prompt([
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
                type: "confirm",
                name: "appauthoaut",
                message: "Would you like to add to your Angular App a Authentication with OAuth?",
                required: true,
                default: this.config.get("appauthoaut") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true
            },
            {
                type: "string",
                name: "appauthoauthtoken",
                message: "Which Token is used for OAuth?",
                required: true,
                default: this.config.get("appauthoauthtoken") || '***********',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthoaut === true
            },

            {
                type: "confirm",
                name: "appauthloopback",
                message: "Would you like to add to your Angular App a Authentication with Loopback?",
                required: true,
                default: this.config.get("appauthloopback") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true
            },
            
            {
                type: "confirm",
                name: "appauthown",
                message: "Would you like to add to your Angular App a Authentication with external server?",
                required: true,
                default: this.config.get("appauthown") || false,
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true
            },
            {
                type: "string",
                name: "appauthserver",
                message: "Which domain:port should be used for Auth Requests?",
                required: true,
                default: this.config.get("appauthserver") || 'http://localhost:8080',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthown === true
            },
            {
                type: "string",
                name: "appauthlogin",
                message: "Which endpoint should be used for Login POST Request?",
                required: true,
                default: this.config.get("appauthlogin") || 'user/login',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthown === true
            },
            {
                type: "string",
                name: "appauthregister",
                message: "Which endpoint should be used for Register POST Request?",
                required: true,
                default: this.config.get("appauthregister") || 'user',
                when: ctx => ctx.projecttype === 'new' && ctx.appauth === true && ctx.appauthown === true
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
                message: "Would you like to add to your SSR Angular App a Transfer Http State Interceptor?",
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
            },

            {
                type: "confirm",
                name: "appsync",
                message: "Would you like to add to your Angular App a Syncronization with Salesforce?",
                required: true,
                default: this.config.get("appsync") || false,
                when: ctx => ctx.projecttype === 'new'
            },
            {
                type: "string",
                name: "appsyncherokuuser",
                message: "Which user should be used for connect with Heroku?",
                required: true,
                default: this.config.get("appsyncherokuuser") || '',
                when: ctx => ctx.projecttype === 'new' && ctx.appsync === true
            },
            {
                type: "string",
                name: "appsyncherokupass",
                message: "Which password should be used for connect with Heroku?",
                required: true,
                default: this.config.get("appsyncherokupass") || '',
                when: ctx => ctx.projecttype === 'new' && ctx.appsync === true
            },
            {
                type: "string",
                name: "appsyncsftoken",
                message: "Which token should be used for connect Salesforce?",
                required: true,
                default: this.config.get("appsyncsftoken") || '',
                when: ctx => ctx.projecttype === 'new' && ctx.appsync === true
            },


            {
                type: "confirm",
                name: "newpage",
                message: "Would you like to implement a new Page for your Angular App?",
                default: this.config.get("newpage") || false,
                required: true,
                when: ctx => ctx.projecttype === 'update'
            },
            {
                type: "string",
                name: "newpagetitle",
                message: "Which is the title for the page?",
                default: this.config.get("newpagetitle") || '',
                required: true,
                when: ctx => ctx.projecttype === 'update' && ctx.newpage === true
            },
            {
                type: "string",
                name: "newpagedescription",
                message: "Which is the description for the page?",
                default: this.config.get("newpagedescription") || '',
                required: true,
                when: ctx => ctx.projecttype === 'update' && ctx.newpage === true
            }

        ]);
        // Dasherize appname
        this.answers.appname = dasherize(this.answers.appname);
    }
    
    configuring() {

    }
    
    default() {

    }
    
    writing() {
        // Store user preferences
        Object.keys(this.answers).map(option => {
            this.config.set(option, this.answers[option]);
        });
    }
    
    conflicts() {

    }
    
    install() {

        // Install the Angular App
        if (this.answers.appnew) {
            this.log(`\n=========================================\n
            Now lets to add a Angular App with Rounting and SCSS style
            \n==========================================`);

            // Create a new Angular App
            this.spawnCommandSync('ng', ['new', this.answers.appname, '--routing', '--style', 'scss']);
            // Run Angular serve, then open in a browser
            this.spawnCommand('ng', ['serve', '-o'], {cwd:  this.destinationPath(this.answers.appname)});
        } else {
            this.log('Do not continue');
        }


       // Run the Angular Responsive Schematic
        if (this.answers.appresponsive) {

            this.log(`\n=========================================\n
            Now lets to add a Responsive feature to you Angular App
            \n==========================================`);

            /*// Temporally, link the local Responsive Schematics
            this.spawnCommandSync('npm', ['link', this.destinationPath('../../SCHEMATICS/cap-angular-schematic-responsive')], {cwd:  this.destinationPath(this.answers.appname)});
            */
            
            // Add Schematics-Responsive
            this.spawnCommandSync('ng', [
                'add', 
                'cap-angular-schematic-responsive', 
                this.answers.appname, 
                this.answers.appresponsivelogo
            ], {cwd:  this.destinationPath(this.answers.appname)});
            
        } else {
            this.log('Do not continue with Responsive feature installation');
        }
        

        // Run the Angular SSR Schematic
        if (this.answers.appssr) {
            
            this.log(`\n=========================================\n
            Now lets to add Angular Universal feature
            \n==========================================`);

            this.spawnCommandSync('ng', ['add', '@nguniversal/express-engine',  '--clientProject', this.answers.appname], {cwd:  this.destinationPath(this.answers.appname)});

        } else {
            this.log('Do not continue with SSR feature installation');
        }
        

        // Install the Angular PWA Schematic
        if (this.answers.apppwa) {

            this.log(`\n=========================================\n
            Now lets add a PWA feature to you Angular App
            \n==========================================`);

            this.spawnCommandSync('ng', ['add', '@angular/pwa', '--clientProject', this.answers.appname], {cwd:  this.destinationPath(this.answers.appname)});


            // Install the Angular PWA App-Shell Schematic
            if (this.answers.apppwashell) {

                this.log(`\n=========================================\n
                Now lets add a PWA App-Shell feature to you Angular App
                \n==========================================`);

                this.spawnCommandSync('ng', ['generate', '@schematics/angular:appShell', '--clientProject', this.answers.appname, '--universalProject', this.answers.appname + '-universal'], {cwd:  this.destinationPath(this.answers.appname)});

            } else {
                this.log('Do not continue with PWA App-Shell feature installation');
            }

            // Install the Angular PWA WebPush Schematic
            if (this.answers.apppwawebpush) {

                this.log(`\n=========================================\n
                Now lets add a PWA WebPush feature to you Angular App
                \n==========================================`);

               /* // Temporally, link the local PWA Schematics
                this.spawnCommandSync('npm', ['link', this.destinationPath('../../SCHEMATICS/cap-angular-schematic-pwa-webpush')], {cwd:  this.destinationPath(this.answers.appname)});
                */
                
                // Add Schematics-PWA
                this.spawnCommandSync('ng', [
                    'add', 
                    'cap-angular-schematic-webpush',
                    this.answers.appname,
                    'http://localhost:4000'
                ], {cwd:  this.destinationPath(this.answers.appname)});
                    
            
            } else {
                this.log('Do not continue with PWA WebPush feature installation');
            }

        
        } else {
            this.log('Do not continue with PWA feature installation');
        }
        
    }
    
    end() {

        // Run the Angular SSR Schematic
        if (this.answers.appssr) {

            // Run App in SSR
            this.log(`\n=========================================\n
            Now lets to run the Angular Universal App
            \n==========================================`);

            this.spawnCommandSync('npm', ['install'], {cwd:  this.destinationPath(this.answers.appname)});

            this.spawnCommandSync('npm', ['run', 'build:ssr'], {cwd:  this.destinationPath(this.answers.appname)});
            this.spawnCommandSync('npm', ['run', 'serve:ssr'], {cwd:  this.destinationPath(this.answers.appname)});

        } else {
            this.log('Do not continue with SSR App Run');
        }
        
        this.log('Finish!');
    }
    

  };