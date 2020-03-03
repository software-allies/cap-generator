var Generator = require('yeoman-generator');
var exec = require('child-process-promise').exec;

module.exports = class extends Generator {    
    
    install() {

        this.log(`\n=========================================\n
        Now lets add a PWA feature to you Angular App
        \n==========================================`);

        this.spawnCommandSync('ng', ['add', '@angular/pwa', '--clientProject', this.options.appName], {cwd:  this.destinationPath(this.options.appName)});

        // Install the Angular PWA App-Shell Schematic

        this.log(`\n=========================================\n
        Now lets add a PWA App-Shell feature to you Angular App
        \n==========================================`);

        this.spawnCommandSync('ng', ['generate', '@schematics/angular:appShell', '--clientProject', this.options.appName, '--universalProject', this.options.appName + '-universal'], {cwd:  this.destinationPath(this.options.appName)});


        // Install the Angular PWA WebPush Schematic

        this.log(`\n=========================================\n
        Now lets add a PWA WebPush feature to you Angular App
        \n==========================================`);

        // Install web-push
        this.log(`\n
        ----------- Install web-push -------------
        \n`);

        
        // this.npmInstall(['web-push'], { g: true },  { cwd:  this.destinationPath(this.options.appName) });

        this.spawnCommandSync('npm', [
            'install', 
            'web-push',
            '-g'
        ], {cwd:  this.destinationPath(this.options.appName)});


        // Get Vapid Keys Pair
        this.log(`\n
        ----------- Get Vapid Keys Pair -------------
        \n`);

        exec('web-push generate-vapid-keys --json', { cwd:  this.destinationPath(this.options.appName) }, (error, stdout) => {

            if (error) {
                console.log('error: you dont have web-push installed');
            } else {

                const vapidKeys = JSON.parse(stdout);
                console.log('vapidKeys', vapidKeys);

                // Add Schematics-Webpush
                    this.spawnCommandSync('ng', [
                    'add', 
                    'cap-angular-schematic-webpush',
                    this.options.appName,
                    'http://localhost:4000',
                    vapidKeys.publicKey || 'xxxxxxxxxxxxxxxxxxxxxx',
                    vapidKeys.privateKey || 'xxxxxxxxxxxxxxxxxxxxxx'
                ], {cwd:  this.destinationPath(this.options.appName)});


                // Run App in SSR
                this.log(`\n=========================================\n
                Now lets to run the PWA App
                \n==========================================`);

                this.spawnCommandSync('npm', ['run', 'app-shell'], { cwd:  this.destinationPath(this.props.appName) });
        
            
            }

        })
        .catch(function (err) {
            console.error('ERROR: ', err);
        });


    }

};