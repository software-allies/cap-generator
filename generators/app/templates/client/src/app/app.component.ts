import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pages: Array<{title: string, path: any}>;

  constructor(){
    this.pages = [
      <% if (imports && imports.auth)  { %>
      {title: 'Register', path: '/auth/register'},
      {title: 'LogIn', path: '/auth/login'},
      {title: 'Change Password', path: '/auth/forgot-password'},
      <% } %>

    ]
  }
}
