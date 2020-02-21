var Generator = require('yeoman-generator');
var exec = require('child-process-promise').exec;

module.exports = class extends Generator {    
    
    install() {


        this.log(`\n=========================================\n
        Now lets add a PWA feature to you Angular App
        \n==========================================`);

        this.spawnCommandSync('ng', ['add', '@angular/pwa', '--clientProject', this.options.appname], {cwd:  this.destinationPath(this.options.appname)});

        // Install the Angular PWA App-Shell Schematic
        if (this.options.apppwashell) {

            this.log(`\n=========================================\n
            Now lets add a PWA App-Shell feature to you Angular App
            \n==========================================`);

            this.spawnCommandSync('ng', ['generate', '@schematics/angular:appShell', '--clientProject', this.options.appname, '--universalProject', this.options.appname + '-universal'], {cwd:  this.destinationPath(this.options.appname)});

        } else {
            this.log('Do not continue with PWA App-Shell feature installation');
        }

        // Install the Angular PWA WebPush Schematic
        if (this.options.apppwawebpush) {

            this.log(`\n=========================================\n
            Now lets add a PWA WebPush feature to you Angular App
            \n==========================================`);

            // Install web-push
            this.log(`\n
            ----------- Install web-push -------------
            \n`);

            
            // this.npmInstall(['web-push'], { g: true },  { cwd:  this.destinationPath(this.options.appname) });

            this.spawnCommandSync('npm', [
                'install', 
                'web-push',
                '-g'
            ], {cwd:  this.destinationPath(this.options.appname)});


            // Get Vapid Keys Pair
            this.log(`\n
            ----------- Get Vapid Keys Pair -------------
            \n`);

            exec('web-push generate-vapid-keys --json', { cwd:  this.destinationPath(this.options.appname) }, async (error, stdout) => {
    
                if (error) {
                    console.log('error: you dont have web-push installed');
                    await loopback.loopbackCLI(this.props.path, true);
                } else {

                    const vapidKeys = JSON.parse(stdout);
                    console.log('vapidKeys', vapidKeys);

                    // Add Schematics-Webpush
                    this.spawnCommandSync('ng', [
                        'add', 
                        'cap-angular-schematic-webpush',
                        this.options.appname,
                        'http://localhost:4000',
                        vapidKeys.publicKey || 'xxxxxxxxxxxxxxxxxxxxxx',
                        vapidKeys.privateKey || 'xxxxxxxxxxxxxxxxxxxxxx'
                    ], {cwd:  this.destinationPath(this.options.appname)});
                
                }
    
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });

            /* const vapidKeys = this.spawnCommand('web-push', [
                'generate-vapid-keys', 
                '--json'
            ], { cwd:  this.destinationPath(this.options.appname), stdio: [process.stderr] }); */

        } else {
            this.log('Do not continue with PWA WebPush feature installation');
        }


    }

};