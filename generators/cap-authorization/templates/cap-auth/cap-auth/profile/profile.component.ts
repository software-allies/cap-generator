import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileUserForm: FormGroup;
  userUpdated: boolean;
  user: any;
  errorUpdate: boolean;
  <%-service==='auth0' ? "userId: string;": ""%>

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    <% if (service === 'auth0') { %>if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : this.router.navigate(['/']);
    }<% } %>
    this.userUpdated = false;
    this.errorUpdate = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {<% if (service === 'auth0') { %>
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.getUser(this.userId, token).subscribe((user: any) => {
        if (user) {
          this.user = user;
          this.profileUserForm = new FormGroup({
            'name': new FormControl(user.name, []),
            'family_name': new FormControl(user.family_name, []),
            'nickname': new FormControl(user.nickname, []),
          });
        }
      }, (error => this.router.navigate(['/'])));
    });<% } %>
    <% if (service === 'firebase') { %>this.authenticationService.currentUser.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.profileUserForm = new FormGroup({
          'displayName': new FormControl(user.displayName, [Validators.required])
        });
      } else {
        this.router.navigate(['/']);
      }
    });<% } %>
  }

  editProfile() {<% if (service === 'auth0') { %>
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.updateProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
        if (userUpdated) {
          this.user = userUpdated;
          this.userUpdated = true;
          setTimeout(() => {
            this.userUpdated = false;
          }, 3000);
        }
      }, (error => {
        this.errorUpdate = true;
        setTimeout(() => {
          this.errorUpdate = false;
        }, 3000);
      }));
    });<% } %>
    <% if (service === 'firebase') { %>this.authenticationService.currentUser.subscribe((user: any) => {
      if ( user ) {
        this.authenticationService.updateProfile(this.profileUserForm.value).then((response: any) => {
          this.userUpdated = true;
          setTimeout(() => {
            this.userUpdated = false;
       }, 3000);
        });
      } else {
        this.router.navigate(['/']);
      }
    });<% } %>
  }
}
