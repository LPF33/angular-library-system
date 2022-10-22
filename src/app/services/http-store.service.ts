import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, map, of } from 'rxjs';
import { IGetResultShelfSystem, IPostShelfSystem } from '../types';

@Injectable({
  providedIn: 'root'
})
export class HttpStoreService {

  host: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getShelfSystem(id: string): Observable<IGetResultShelfSystem> {
    return this.http.get<IGetResultShelfSystem>(this.host + "/v1/shelfsystem/" + id)
  }

  public saveShelfSystem(id: string, name: string) {
    this.http.post<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system: [[]]
    }).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  public updateShelfSystem(id: string, name: string) {
    this.http.post<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system: [[]]
    }).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  public updateShelfSystemName(id: string, name: string) {
    this.http.put<IPostShelfSystem>(this.host + "/v1/shelfsystemname/", {
      systemid: id,
      systemname: name,
    }).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.host + url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.host + url, body);
  }
}
