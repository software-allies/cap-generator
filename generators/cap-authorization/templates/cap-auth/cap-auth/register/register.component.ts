import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { CommunicationComponentsService } from '../../../shared/services/communication-components.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  createUserForm: FormGroup;
  existingUser: Boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private communicationComponentsService: CommunicationComponentsService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.existingUser = false;
    this.createUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), this.capitalLetter]),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'company': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'termsConditions': new FormControl(false, [this.termsAndConditions]),
    });
  }

  ngOnInit() { }

  termsAndConditions(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      return null;
    }
    return {
      termsAndConditions: true
    };
  }

  capitalLetter(control: FormControl): { [s: string]: boolean } {
    const letter = control.value.charAt(0);
    if (control.value && !(letter === control.value.charAt(0).toUpperCase())) {
      return {
        capitalLetter: true
      };
    }
    return null;
  }

  createUser() {
    this.authenticationService.getAuth0Token().subscribe((token: any) => {
      this.authenticationService.createAuth0User(token, this.createUserForm.value).subscribe((user: any) => {
        if (user) {
          this.authenticationService.loginAuth0User(this.createUserForm.value).subscribe((Access_Token: any) => {
            Access_Token.user = this.createUserForm.get('firstName').value;
            Access_Token.email = this.createUserForm.get('email').value;
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('User', JSON.stringify(Access_Token));
              this.communicationComponentsService.sendUser(true);
              this.router.navigate(['/']);
            }
          });
        }
      }, (error) => {
        if (error.status === 409) {
          this.existingUser = true;
        }
      });
    });
  }

}
