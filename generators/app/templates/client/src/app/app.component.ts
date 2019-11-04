import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommunicationComponentsService } from './shared/services/communication-components.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pages: Array<{title: string, path: any}>;
  user: boolean;
  userName: string;

  constructor(
    private communicationComponentsService: CommunicationComponentsService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.user = false;
    this.userName = null;
    this.pages = [
      <% if (imports && imports.auth)  { %>
      {title: 'Register', path: '/auth/register'},
      {title: 'LogIn', path: '/auth/login'},
      {title: 'Change Password', path: '/auth/forgot-password'},
      <% } %>
    ];
    this.isLogin();
  }

  ngOnInit() {
    this.communicationComponentsService.sendMessageObserbable.subscribe((user: boolean) => {
      if (user) {
        this.isLogin();
      }
    });
  }

  isLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).user : null;
      this.user = this.userName ? true : false;
    }
  }

  logOutUser() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
        localStorage.removeItem('User');
      }
    }
    this.isLogin();
  }
}
