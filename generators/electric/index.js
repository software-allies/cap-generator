var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
      this.log('prompting - zap');
    }
  
    writing() {
      this.log('writing - zap');
    }
  };
  

  


            /*// Temporally, link the local PWA Schematics
            this.spawnCommand('npm', ['link', this.destinationPath('../../schematics/schematics-ssr')], {cwd:  this.destinationPath(this.answers.appname)});
            // Add Schematics-PWA
            this.spawnCommandSync('ng', ['add', 'schematics-ssr'], {cwd:  this.destinationPath(this.answers.appname)});

            // Install new packages
            this.spawnCommandSync('npm',[ 'install'], {cwd:  this.destinationPath(this.answers.appname)});
            // Start the server and run as a SSR App
            this.spawnCommand('npm', ['run', 'build:ssr'], {cwd:  this.destinationPath(this.answers.appname)});
            this.spawnCommand('npm', ['run', 'serve:ssr'], {cwd:  this.destinationPath(this.answers.appname)});
            
            
            
            // Temporally, link the local PWA Schematics
            this.spawnCommand('npm', ['link', this.destinationPath('../../schematics/schematics-pwa')], {cwd:  this.destinationPath(this.answers.appname)});
            // Add Schematics-PWA
            this.spawnCommandSync('ng', ['add', 'schematics-pwa'], {cwd:  this.destinationPath(this.answers.appname)});
            // Install new packages
            this.spawnCommandSync('npm',[ 'install'], {cwd:  this.destinationPath(this.answers.appname)});
            // Start the server and run as a PWA, then open in a browser
            this.spawnCommand('npm', ['run', 'start-pwa', '-o'], {cwd:  this.destinationPath(this.answers.appname)});
            
            
            
            
            */