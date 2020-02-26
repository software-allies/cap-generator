var Generator = require('yeoman-generator');

module.exports = class extends Generator {    
    
    install() {

        if (this.options.appAuthService === 'auth0') {
        
            this.log(`\n=========================================\n
            Now lets to add a Authentication Module with Auth0
            \n==========================================`);

            // Add Cap Authentication Schematic
            this.spawnCommandSync('ng', [
                'add', 
                'cap-angular-schematic-auth-auth0', 
                this.options.appAuth0ClientId,
                this.options.appAuth0ClientSecret,
                this.options.appAuth0Domain,
                this.options.appAuth0EndPoint
            ], { cwd:  this.destinationPath(this.options.appName) });

        } else if(this.options.appAuthService === 'firebase') {

            console.log('Under construction...');

        }
    }

};
