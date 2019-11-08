import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommunicationComponentsService } from './shared/services/communication-components.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  modules: Array<{module: string, reference: string, pages: Array<{title: string, path: string}>}>;
  user: boolean;
  userName: string;

  constructor(
    private communicationComponentsService: CommunicationComponentsService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.user = false;
    this.userName = null;
    this.modules = [
      <% if (imports && imports.auth){ %>{
        module: 'Authentication',
        reference: 'Auth',
        pages: [
          {title: 'Register', path: '/auth/register'},
          {title: 'LogIn', path: '/auth/login'},
          {title: 'Change Password', path: '/auth/forgot-password'},
        ]
      },<% } %>
      <% if (imports && imports.awsStorage) {-%>{
        module: 'Amazon Web Services',
        reference: 'Aws',
        pages: [
          {title: 'Upload Images', path: '/aws/image-upload'},
          {title: 'Upload Files', path: '/aws/file-upload'}
        ]
      }<% } %>
    ];
    this.isLogin();
  }

  ngOnInit() {
    <% if (imports && imports.auth){ %>
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
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
        localStorage.removeItem('User');
      }
    }
    this.isLogin();
  }
}
