import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { IResultLibrary, ISystem } from 'src/app/types';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.css']
})
export class LibraryViewComponent implements OnInit {

  shelfsystems: Omit<ISystem, "system">[] = [];

  constructor(private http: HttpService) {
    this.getSystems();
  }

  ngOnInit(): void {
  }

  getSystems(){
    this.http.get<IResultLibrary>("/v1/shelfsystems").subscribe((response) => {
      this.shelfsystems = response.result;
    });
  }

}
