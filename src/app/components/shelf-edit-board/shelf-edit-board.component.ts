import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { IBook, IGetResultShelf, IPutPostDeleteResult } from 'src/app/types';
import { IAppState } from 'src/app/state/state.types';
import { saveShelf, saveBook } from 'src/app/state/app.actions';

@Component({
  selector: 'app-shelf-edit-board',
  templateUrl: './shelf-edit-board.component.html',
  styleUrls: ['./shelf-edit-board.component.css']
})
export class ShelfEditBoardComponent implements OnInit, OnDestroy {

  @Input() shelfId?: string;
  @Input() systemId?: string;
  @Input() booksLength: null | number = null;

  @Output() closeEdit = new EventEmitter();

  subscription?: Subscription;
  bookPreviewId: number | null = null;

  constructor(private http: HttpService, private shareData: ShareDataService, private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.subscription = this.shareData.currentData.subscribe(bookIndex => {
      this.bookPreviewId = bookIndex;
    });

    if (this.booksLength === null) {
      return this.saveShelf();
    }
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
    this.store.dispatch(saveShelf({ shelfId: this.shelfId as string, systemId: this.systemId as string }));
  }

  saveBook(bookId: string, title: string, author: string) {
    this.store.dispatch(saveBook({ bookId, shelfId: this.shelfId as string, author, title, shelfIndex: this.booksLength ?? 0 }));
  }

  noPreview() {
    this.shareData.changeData(null);
  }
}
