var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      // this.option('babel'); // This method adds support for a `--babel` flag

          // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: true });

    // This method adds support for a `--coffee` flag
    this.option("coffee");

      this.helperMethod = function () {
        console.log('won\'t be called automatically');    
        // And you can then access it later; e.g.
        this.log('argument appname', this.options.appname);
        this.log('options.coffee', this.options.coffee ? ".coffee" : ".js");
      };
      
        /* this.prompt({
            type: "input",
            name: "name",
            message: "Your project name..",
            store: true
        }); */

        this.appname = this.options.appname;
    }

    initializing() {
        this.composeWith(require.resolve('../turbo'));
        this.composeWith(require.resolve('../electric'));
    }



    async prompting() {
        this.answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
          },
          {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
          }
        ]);
    }

    method1() {
        this.log('method 1 just ran');
        this.helperMethod();
        this.log("this.config.getAll()", this.config.getAll()); 
        this.config.getAll()
    }


    method2() {
        this.log('method 2 just ran');
    }

    /* asyncTask() {
        var done = this.async();
      
        getUserEmail(function (err, name) {
          done(err);
        });
    } */
    

    writing() {
        this.log("cool feature", this.answers.cool); // user answer `cool` used
        this.config.set('appname', this.answers.name);


        const pkgJson = {
            devDependencies: {
              eslint: '^3.15.0'
            },
            dependencies: {
              react: '^16.2.0'
            }
          };
      
          // Extend or create package.json file in destination path
          this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
      
    install() {
        // this.npmInstall();
        this.spawnCommand('ng', ['version']);
    }

    /* installingLodash() {
        this.npmInstall(['lodash'], { 'save-dev': true });
    } */

  };