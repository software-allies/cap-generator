import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CommunicationComponentsService } from '../../../shared/services/communication-components.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  userNotValid: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private communicationComponentsService: CommunicationComponentsService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.loginUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
    this.userNotValid = false;
  }

  ngOnInit() { }

  loginUser() {<% if (service === 'auth0')  { %>
    this.authenticationService.loginUser(this.loginUserForm.value).subscribe((token: any) => {
      this.authenticationService.getAuth0UserInfo(token.access_token).subscribe((user: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', JSON.stringify({
            user: user.name,
            email: user.email,
            refresh_token: token.refresh_token,
            token: token.access_token,
            token_id: token.id_token,
            id: user.sub
          }));
          this.communicationComponentsService.sendUser(true);
          this.router.navigate(['/']);
        }
      });
    }, (error) => {
      this.userNotValid = true;
    });<% } %>
    <% if (service === 'firebase')  { %>
    this.authenticationService.loginUser(this.loginUserForm.value)
    .then((response) => {
      response.user.getIdTokenResult().then((res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', JSON.stringify({
            user: response.user.email.split('@', 1)[0],
            email: response.user.email,
            refresh_token: response.user.refreshToken,
            token: res.token
          }));
          this.communicationComponentsService.sendUser(true);
          this.router.navigate(['/']);
        }
      });
    }).catch(error => this.userNotValid = true); <%}%>
  }

  signInSocialMedia(socialMedia:boolean) {
    <%if(service==='firebase'){%>if (socialMedia) {
      this.authenticationService.authWithFacebook().then((response) => {
        response.user.getIdTokenResult().then((res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('User', JSON.stringify({
              user: response.user.email.split('@', 1)[0],
              email: response.user.email,
              refresh_token: response.user.refreshToken,
              token: res.token
            }));
          }
        }).then(() => {
          this.communicationComponentsService.sendUser(true);
          this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);
    } else {
      this.authenticationService.authWithGoogle().then((response) =>  {
        response.user.getIdTokenResult().then((res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('User', JSON.stringify({
              user: response.user.email.split('@', 1)[0],
              email: response.user.email,
              refresh_token: response.user.refreshToken,
              token: res.token
            }));
          }
        }).then(() => {
          this.communicationComponentsService.sendUser(true);
          this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);
    }<%}%>
  }
}
