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
            this.options.apptitle, 
            this.options.appresponsivelogo,
            this.options.removeAppComponentHtml,
            this.options.auth,
            this.options.installAuth
        ], {cwd:  this.destinationPath(this.options.appname)});
    }

};