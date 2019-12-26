import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoopbackService {

  url: string;
  accessToken = 'l8fdFvY6FzEnKvHwLDxMY3xlZYlhQwxyzDmCJz43RPd5HpiClrjrts6BVyHdiWmz';

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api";
  }

  getAllRequest(tableName: string) {
    return this.http.get(
      `${this.url}/${tableName}?access_token=${this.accessToken}`
    );
  }

  getWithFilter(query: string) {
    return this.http.get(
      `${this.url}/${query}&access_token=${this.accessToken}`
    );
  }

  getTotalItems(tableName: string) {
    return this.http
      .get(
        `${this.url}/${tableName}/count/?access_token=${this.accessToken}`
      )
      .pipe(
        map((data: any) => {
          return data.count;
        })
      );
  }

  getRecordWithFindOne(tableName: string, sfid: string) {
    return this.http.get(
      `${this.url}/${tableName}/findOne?filter={"where":{"SfId":"${sfid}"}}&access_token=${this.accessToken}`
    );
  }
  getRecordRequest(tableName: string, id: number) {
    return this.http.get(
      `${this.url}/${tableName}/${id}?access_token=${this.accessToken}`
    );
  }

  postRequest(tableName: string, body: object) {
    return this.http.post(
      `${this.url}/${tableName}?access_token=${this.accessToken}`,
      body
    );
  }

  patchRequest(tableName: string, id: number, body: object) {
    return this.http.patch(
      `${this.url}/${tableName}/${id}?access_token=${this.accessToken}`,
      body
    );
  }

  deleteItem(tableName: string, id: number) {
    return this.http.delete(
      `${this.url}/${tableName}/${id}?access_token=${this.accessToken}`
    );
  }
}
