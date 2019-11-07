import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
<% if (service === 'firebase')  { %>
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
<% } %>
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly Auth0: any;
  constructor(
    protected http: HttpClient<%- service==='firebase' ? ",\n\t\tprivate afAuth: AngularFireAuth" : "" %>
  ) {
    this.Auth0 = environment;
  }

  getAuth0Credentials() {<% if(service==='auth0'){ %>
    return {
      'client_id': `${this.Auth0.AUTH0_CLIENT_ID}`,
      'client_secret': `${this.Auth0.AUTH0_CLIENT_SECRET}`,
      'audience': `${this.Auth0.AUTH0_DOMAIN}/api/v2/`,
      'grant_type': 'client_credentials'
    };<%}%>
  }

  getAuth0Token()<%- service==='auth0' ? ": Observable<string>" : "" %>
  {<% if(service==='auth0'){ %>
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
      );<%}%>
  }

  getAuth0UserInfo(token: string){<% if(service==='auth0'){%>
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.Auth0.AUTH0_DOMAIN}/userinfo`, httpOptions);<%}%>
  }

  createUser(user: any, access_token?: string) <%-service==='firebase' ? ": Promise<firebase.auth.UserCredential>" : ""%> {<% if(service==='auth0'){ %>
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
    return this.http.post(`${this.Auth0.AUTH0_DOMAIN}/api/v2/users`, User, httpOptions);<%}%>
    <%if(service==='firebase'){%>return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);<%}%>
  }

  loginUser(user: any)<%-service==='firebase' ? ": Promise<firebase.auth.UserCredential>" : ""%> { <% if(service==='auth0'){ %>
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
    return this.http.post(`${this.Auth0.AUTH0_DOMAIN}/oauth/token`, httpParams, httpOptions);<% } %>
    <%if(service==='firebase'){%>return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)<%}%>
  }

  authWithFacebook()<%-service==='firebase' ? ": Promise<firebase.auth.UserCredential>" : ""%> {<%if(service==='firebase'){%>
    const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return this.afAuth.auth.signInWithPopup(provider);<%}%>
  }

  authWithGoogle()<%-service==='firebase' ? ": Promise<firebase.auth.UserCredential>" : ""%> {<%if(service==='firebase'){%>
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());<%}%>
  }

}
