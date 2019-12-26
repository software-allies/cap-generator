import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommunicationComponentsService } from './shared/services/communication-components.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from './modules/cap-auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: boolean;
  userName: string;
  authModule: Array<{ title: string, path: string }> = [
    {title: 'Register', path: '/register'},
    {title: 'LogIn', path: '/login'},
    {title: 'Forgot Password', path: '/forgot-password'},
  ];
  <%if(imports && imports.herokuConnect){%>herokuModules: Array<{title: string, path: string }> = [
    {title: 'Account', path: '/account'},
    {title: 'Contact', path: '/contact'},
    {title: 'Lead', path: '/lead'},
    {title: 'Opportunity', path: '/opportunity'}
  ];<% } %>
  constructor(
    private communicationComponentsService: CommunicationComponentsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.user = false;
    this.userName = null;
    this.isLogin();
  }

  ngOnInit() {
    <% if (authService === 'auth0'){ %>
    this.communicationComponentsService.sendMessageObserbable.subscribe((user: boolean) => {
      if (user) {
        this.isLogin();
      }
    });<%}%>
  }

  isLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).user : null;
      this.user = this.userName ? true : false;
    }
  }

  logOutUser() {
    this.authenticationService.signOut();
    this.isLogin();
    this.router.navigate(['/']);
  }
}
