var Generator = require('yeoman-generator');

module.exports = class extends Generator {    
    
    install() {
        
        this.log(`\n=========================================\n
        Now lets to add Angular Universal feature
        \n==========================================`);

        this.spawnCommandSync('ng', ['add', '@nguniversal/express-engine',  '--clientProject', this.options.appname], {cwd:  this.destinationPath(this.options.appname)});
    }

};