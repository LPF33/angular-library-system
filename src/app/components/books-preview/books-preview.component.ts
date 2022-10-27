import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { IGetResultBook } from 'src/app/types';

@Component({
  selector: 'app-books-preview',
  templateUrl: './books-preview.component.html',
  styleUrls: ['./books-preview.component.css']
})
export class BooksPreviewComponent implements OnChanges {

  @Input() bookIndex?: number;
  @Input() shelfId?: string;

  title: string = "";
  author: string = "";
  created_att?: Date;

  constructor(private http: HttpService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadBook();
  }

  loadBook() {
    this.http.get<IGetResultBook>(`/v1/book/${this.bookIndex}/${this.shelfId}`).subscribe(response => {
      if (Array.isArray(response.result) && response.result.length) {
        this.title = response.result[0].title;
        this.author = response.result[0].author;
      }
      console.log(response);
    })
  }

}
