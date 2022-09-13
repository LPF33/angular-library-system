import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.host + url);
  }

  public post(url: string, body: any) {
    return this.http.post(this.host + url, body);
  }

  public put(url: string, body: any) {
    return this.http.put(this.host + url, body);
  }
}
