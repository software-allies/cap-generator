import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  changeform: FormGroup;
  emailSend: boolean;
  errorEmailSend: boolean;
  validatedForm: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.emailSend = false;
    this.errorEmailSend = false;
    this.validatedForm = false;
  }
  ngOnInit() {
    this.changeform = new FormGroup({
      'email': new FormControl('', [Validators.required]),
    });
  }

  forgorPassword() {
    if (this.changeform.valid) {
      <% if (authService === 'auth0') { %>this.authenticationService.changePassword(this.changeform.value).subscribe((response: any) => {}, (error) => {
        if (error.status === 200) {
          this.emailSend = true;
        } else if (error.status > 400) {
          this.errorEmailSend = true;
        }
      });<% } %>
      <% if (authService === 'firebase') { %>this.authenticationService.changePassword(this.changeform.value).then((user: any) => {
        this.emailSend = true;
      }).catch(error => this.errorEmailSend = true);<% } %>
    } else {
      this.validatedForm = true;
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
