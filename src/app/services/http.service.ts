import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetResultBook, IGetResultShelfSystem, IPostShelfSystem, IResultLibrary } from '../types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getShelfSystem(id: string): Observable<IGetResultShelfSystem> {
    return this.http.get<IGetResultShelfSystem>(this.host + "/v1/shelfsystem/" + id);
  }

  public saveShelfSystem(id: string, name: string): Observable<IPostShelfSystem> {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system: [[]]
    });
  }

  public updateShelfSystem(id: string, name: string, system: string[][]): Observable<IPostShelfSystem> {
    return this.http.put<IPostShelfSystem>(this.host + "/v1/shelfsystem/", {
      systemid: id,
      systemname: name,
      system
    });
  }

  public saveShelf(shelfId: string, systemId: string): Observable<IPostShelfSystem> {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/shelf/", {
      systemid: systemId,
      shelfid: shelfId,
    });
  }

  public getBook(bookIndex: number, shelfId: string): Observable<IGetResultBook> {
    return this.http.get<IGetResultBook>(`${this.host}/v1/book/${bookIndex}/${shelfId}`);
  }

  public saveBook(bookId: string, shelfId: string, author: string, title: string, shelfIndex: number): Observable<IPostShelfSystem> {
    return this.http.post<IPostShelfSystem>(this.host + "/v1/book/", {
      bookid: bookId,
      shelfid: shelfId,
      author,
      title,
      shelfindex: shelfIndex
    });
  }

  public searchBook(search: string): Observable<IGetResultBook> {
    return this.http.get<IGetResultBook>(this.host + "/v1/book/search?q=" + search);
  }

  public getShelfSystems(): Observable<IResultLibrary> {
    return this.http.get<IResultLibrary>(this.host + "/v1/shelfsystems");
  }

  public getBookByISBN(isbn: string): Observable<any> {
    return this.http.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=data&format=json");
  }
}
