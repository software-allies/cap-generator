import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthenticationService } from '../cap-auth/authentication.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoopbackService {

  url: string;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.url = "http://localhost:3000/api";
  }

  getAllRequest(tableName: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.get(`${this.url}/${tableName}`, httpOptions);
  }

  getWithFilter(query: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.get(`${this.url}/${query}`, httpOptions);
  }

  getTotalItems(tableName: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.get(`${this.url}/${tableName}/count`, httpOptions)
      .pipe(map( (data: any) => {
          return data.count;
        })
      );
  }

  getRecordWithFindOne(tableName: string, sfid: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.get(`${this.url}/${tableName}/findOne?filter={"where":{"SfId":"${sfid}"}}`, httpOptions);
  }

  getRecordRequest(tableName: string, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.get(`${this.url}/${tableName}/${id}`, httpOptions);
  }

  postRequest(tableName: string, body: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.post(`${this.url}/${tableName}`, body, httpOptions);
  }

  patchRequest(tableName: string, id: number, body: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.patch(`${this.url}/${tableName}/${id}`, body, httpOptions);
  }

  deleteItem(tableName: string, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.authenticationService.getToken()}`
      })
    };
    return this.http.delete(`${this.url}/${tableName}/${id}`, httpOptions);
  }
}