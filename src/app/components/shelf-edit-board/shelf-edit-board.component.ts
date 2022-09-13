import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { IBook } from 'src/app/types';

@Component({
  selector: 'app-shelf-edit-board',
  templateUrl: './shelf-edit-board.component.html',
  styleUrls: ['./shelf-edit-board.component.css']
})
export class ShelfEditBoardComponent implements OnInit {

  @Input() index?: number;
  @Input() books: number = 0;
  @Input() shelfid?: string;
  @Input() systemid?: string;
  @Input() newSystem?: boolean;
  @Output() closeEdit = new EventEmitter();

  booksOnShelf: string[] = [];
  shelfSaved: boolean = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    if (this.newSystem === false) {
      this.loadShelf();
    }
  }

  close() {
    this.closeEdit.emit();
  }

  addBook({ bookId, title, author }: IBook) {
    this.books++;
    this.booksOnShelf.push(bookId);
    this.save(bookId, title, author);
  }

  saveShelf() {
    this.http.post("/v1/shelf/", {
      shelfid: this.shelfid,
      systemid: this.systemid,
      books: this.booksOnShelf,
    }).subscribe(response => {
      this.shelfSaved = true;
    })
  }

  saveBook(bookId: string, title: string, author: string) {
    this.http.post("/v1/book/", {
      bookid: bookId,
      shelfid: this.shelfid,
      author,
      title
    }).subscribe((response) => {
      console.log(response);
    })
  }

  save(bookId: string, title: string, author: string) {
    if (!this.shelfSaved) {
      this.saveShelf();
    }
    this.saveBook(bookId, title, author);
  }

  loadShelf() {
    console.log("loading");
  }
}
