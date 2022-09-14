import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataSource = new BehaviorSubject<null | number>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: null | number) {
    this.dataSource.next(data);
  }
}
