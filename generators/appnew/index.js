var Generator = require('yeoman-generator');

module.exports = class extends Generator {    
    
    install() {
        
        // Install the Angular App
        this.log(`\n=========================================\n
        Now lets to add a Angular App with Rounting and SCSS style
        \n==========================================`);

        // Create a new Angular App
        this.spawnCommandSync('ng', ['new', this.answers.appname, '--routing', '--style', 'scss']);
    }

};