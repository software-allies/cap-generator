import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  createUserForm: FormGroup;
  existingUser: Boolean;

  constructor() {
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
    console.log(this.createUserForm.value);
  }
}
