var Generator = require('yeoman-generator');

module.exports = class extends Generator {    
    
    install() {

        if (this.options.appauthservice === 'auth0') {
        
            this.log(`\n=========================================\n
            Now lets to add a Authentication Module with Auth0
            \n==========================================`);

            // Add Cap Authentication Schematic
            this.spawnCommandSync('ng', [
                'add', 
                'cap-angular-schematic-authentication-forked@0.1.2', 
                this.options.appauth0clientid,
                this.options.appauth0clientsecret,
                this.options.appauth0domain,
                this.options.appauth0endpoint
            ], { cwd:  this.destinationPath(this.options.appname) });

        } else if(this.options.appauthservice === 'firebase') {

            console.log('Under construction...');

        }
    }

};
