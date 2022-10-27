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

  public saveShelfSystem(id: string, name: string): Observable<IPostShelfSystem> {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system: [[]]
    })
  }

  public updateShelfSystem(id: string, name: string, system: string[][]): Observable<IPostShelfSystem> {
    return this.http.put<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system
    })
  }

  public saveShelf(shelfId: string, systemId: string) {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/shelf/", {
      systemid: systemId,
      shelfid: shelfId,
    })
  }

  public saveBook(bookId: string, shelfId: string, author: string, title: string, shelfIndex: number) {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/book/", {
      bookid: bookId,
      shelfid: shelfId,
      author,
      title,
      shelfindex: shelfIndex
    })
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.host + url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.host + url, body);
  }
}
