import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
<% if (imports && imports.awsStorage) { -%>
import { PhotoListPage } from '../pages/photo-list/photo-list';
import { PhotoUploadPage } from '../pages/photo-upload/photo-upload';
<% } -%>
<% if (imports && imports.auth) { -%>
import { ChangePasswordPage } from './../pages/change-password/change-password';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
<% } -%>

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }<%- imports ?  ',' : '' -%>
      <% if (imports && imports.awsStorage)  { %>
      { title: 'photos', component: PhotoListPage },
      { title: 'upload', component: PhotoUploadPage }
      <% } %>
      // if imports.awsStorage exists or was chosen then put a comma
      <%- imports && imports.awsStorage ?  ',' : '' -%>
      <% if (imports && imports.auth)  { %>
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Change Password', component: ChangePasswordPage }
      <% } %>
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}