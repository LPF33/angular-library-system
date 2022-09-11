import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  checkIfExisting(id: string):boolean {
    return !!localStorage.getItem(id);
  }

  saveShelfSystem(id: string, name: string, system: (string | 0)[][]){
    const obj = {
      id, name, system
    };
    localStorage.setItem(name, JSON.stringify(obj));
  }

  saveShelfBoard(id: string, books: string[]){
    const obj = {
      id, books
    }
    localStorage.setItem(id, JSON.stringify(obj));
  }

  saveBook(id: string, author: string, title: string) {
    const obj = {
      id, author, title
    };
    localStorage.setItem(id, JSON.stringify(obj));
  }

  getShelfSystem(name: string){
    return localStorage.getItem(name);
  }

  getShelfBoard(id: string){
    return localStorage.getItem(id);
  }

  getBook(id: string){
    return localStorage.getItem(id);
  }

  deleteSystem(id: string){
    localStorage.removeItem(id);
  }
}
