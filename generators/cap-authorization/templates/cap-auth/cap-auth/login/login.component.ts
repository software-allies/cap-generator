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
  userNotValid: Boolean;

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

  loginUser() {
    this.authenticationService.loginAuth0User(this.loginUserForm.value).subscribe((user: any) => {
      this.authenticationService.getAuth0UserInfo(user.access_token).subscribe((userInfo: any) => {
        user.user = userInfo.name;
        user.email = userInfo.email;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', JSON.stringify(user));
          this.communicationComponentsService.sendUser(true);
          this.router.navigate(['/']);
        }
      });
    }, (error) => {
      this.userNotValid = true;
    });
  }

}