import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private rootURL: String = "http://127.0.0.1/builder/api/";
  constructor(private http: HttpClient) {}

  public get(path: string, data: any): Promise<any[]> {
    return new Promise((resolve: any, reject: any) => {
      this.http
        .get(`${this.rootURL}/${path}?data=${JSON.stringify(data)}`)
        .toPromise()
        .then((value: any) => {
          resolve(value);
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public post(path: string, data: any): Promise<any[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let params = new HttpParams().set("data", `${JSON.stringify(data)}`);

    return new Promise((resolve: any, reject: any) => {
      this.http
        .post(`${this.rootURL}/${path}`, params.toString(), { headers: headers })
        .toPromise()
        .then((value: any) => {
          resolve(value);
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }
}
