import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly Auth0: any;
  constructor(protected http: HttpClient) {
    this.Auth0 = environment;
  }

  getAuth0Credentials() {
    return {
      'client_id': `${this.Auth0.AUTH0_CLIENT_ID}`,
      'client_secret': `${this.Auth0.AUTH0_CLIENT_SECRET}`,
      'audience': `${this.Auth0.AUTH0_DOMAIN}/api/v2/`,
      'grant_type': 'client_credentials'
    };
  }

  getAuth0Token(): Observable<string> {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const httpParams = this.getAuth0Credentials();
    return this.http.post(`${this.Auth0.AUTH0_DOMAIN}/oauth/token`, httpParams, httpOptions)
      .pipe(
        map((data: any) => {
          return data.access_token;
        })
      );
  }

  createAuth0User(access_token: string, user: any) {
    let User = {
      email: `${user.email}`,
      password: `${user.password}`,
      email_verified: false,
      name: `${user.firstName}`,
      family_name: `${user.lastName}`,
      nickname: `${user.lastName}`,
      connection: 'Username-Password-Authentication',
      verify_email: true
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })
    };
    return this.http.post(`${this.Auth0.AUTH0_DOMAIN}/api/v2/users`, User, httpOptions);
  }

  loginAuth0User(user: any) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    const httpParams = new HttpParams().append('username', `${user.email}`)
                                .append('password', `${user.password}`)
                                .append('audience', `${this.Auth0.AUTH0_DOMAIN}/api/v2/`)
                                .append('scope', 'openid profile email offline_access')
                                .append('client_id', `${this.Auth0.AUTH0_CLIENT_ID}`)
                                .append('client_secret', `${this.Auth0.AUTH0_CLIENT_SECRET}`)
                                .append('realm', 'employees')
                                .append('grant_type', 'password');
    return this.http.post(`${this.Auth0.AUTH0_DOMAIN}/oauth/token`, httpParams, httpOptions);
  }

  getAuth0UserInfo(token:string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.Auth0.AUTH0_DOMAIN}/userinfo`, httpOptions);
  }

}
