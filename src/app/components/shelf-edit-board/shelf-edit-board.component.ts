import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { IBook, IGetResultShelf, IPutPostDeleteResult } from 'src/app/types';

@Component({
  selector: 'app-shelf-edit-board',
  templateUrl: './shelf-edit-board.component.html',
  styleUrls: ['./shelf-edit-board.component.css']
})
export class ShelfEditBoardComponent implements OnInit, OnDestroy {

  @Input() shelfid?: string;
  @Input() systemid?: string;
  @Output() closeEdit = new EventEmitter();

  subscription?: Subscription;
  booksOnShelf: string[] = [];
  booksCount: number = 0;
  shelfSaved: boolean = false;
  bookPreviewId: string | null = null;
  newSystem: boolean = false;

  constructor(private http: HttpService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.subscription = this.shareData.currentData.subscribe(bookIndex => {
      if (bookIndex !== null) {
        this.bookPreviewId = this.booksOnShelf[bookIndex];
      } else {
        this.bookPreviewId = bookIndex;
      }
    });

    if (this.newSystem) {
      return this.saveShelf();
    }
    this.loadShelf();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
    this.closeEdit.emit();
  }

  addBook({ bookId, title, author }: IBook) {
    this.saveBook(bookId, title, author);
  }

  saveShelf() {
    this.http.post<IPutPostDeleteResult>("/v1/shelf/", {
      shelfid: this.shelfid,
      systemid: this.systemid,
      books: this.booksOnShelf,
    }).subscribe(response => {
      if (response.success) {
        console.log("shelf saved", response);
        this.shelfSaved = true;
      }
      // when no success & error
    })
  }

  saveBook(bookId: string, title: string, author: string) {
    this.http.post<IPutPostDeleteResult>("/v1/book/", {
      bookid: bookId,
      shelfid: this.shelfid,
      author,
      title,
      books: [...this.booksOnShelf, bookId],
    }).subscribe((response) => {
      console.log("book saved", response);
      if (response.success) {
        this.booksCount++;
        this.booksOnShelf.push(bookId);
      }
      // when no success & error
    })
  }

  loadShelf() {
    this.http.get<IGetResultShelf>("/v1/shelf/" + this.shelfid).subscribe({
      next: (response) => {
        console.log("shelfload", response);
        if (Array.isArray(response.result) && response.result.length) {
          this.shelfid = response.result[0].shelfid;
          this.systemid = response.result[0].systemid;
          this.booksOnShelf = response.result[0].books;
          this.booksCount = this.booksOnShelf.length;
          this.shelfSaved = true;
        } else {
          this.saveShelf();
        }
      },
      error: (err) => console.log(err)
    })
  }

  noPreview() {
    this.shareData.changeData(null);
  }
}
