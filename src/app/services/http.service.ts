
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

    public post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(this.host + url, body);
    }

    public put<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(this.host + url, body);
    }
} 