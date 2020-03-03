var Generator = require('yeoman-generator');

module.exports = class extends Generator {    
    
    install() {

        this.log(`\n=========================================\n
        Now lets to add a Responsive feature to you Angular App
        \n==========================================`);
        
        // Add Schematics-Responsive
        this.spawnCommandSync('ng', [
            'add', 
            'cap-angular-schematic-responsive', 
            this.options.appTitle, 
            this.options.appResponsiveLogo,
            this.options.removeAppComponentHtml,
            this.options.auth,
            this.options.service,
            this.options.installAuth,
            this.options.sfcore
        ], {cwd:  this.destinationPath(this.options.appName)});
    }

};