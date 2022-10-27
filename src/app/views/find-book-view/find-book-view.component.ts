import { Component, OnInit } from '@angular/core';
import { HttpStoreService } from 'src/app/services/http-store.service';
import { ISearchBooks } from 'src/app/types';

@Component({
  selector: 'app-find-book-view',
  templateUrl: './find-book-view.component.html',
  styleUrls: ['./find-book-view.component.css']
})
export class FindBookViewComponent implements OnInit {

  search: string = "";
  foundBooks: null | ISearchBooks[] = null;

  constructor(private http: HttpStoreService) { }

  ngOnInit(): void {
  }

  inputChange(event: Event) {
    if ((event.target as HTMLInputElement)?.value) {
      this.http.searchBook((event.target as HTMLInputElement).value).subscribe({
        next: (response) => this.foundBooks = response.result,
        error: (err) => console.log(err)
      });
    }
  }

}
