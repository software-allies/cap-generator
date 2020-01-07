import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../cap-auth/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
