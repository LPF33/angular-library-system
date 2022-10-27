import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/state.types';
import { selectNewSystem, selectShelfBooks, selectSystemId } from 'src/app/state/app.selector';

@Component({
  selector: 'app-shelf-board',
  templateUrl: './shelf-board.component.html',
  styleUrls: ['./shelf-board.component.css']
})
export class ShelfBoardComponent implements OnInit, OnDestroy {

  @Input() shelfid?: string;
  @Input() onlySVG: boolean = false;

  @Output() delete = new EventEmitter();

  showEditBoard: boolean = false;
  bookIndex: number | null = null;
  subscription?: Subscription;
  booksSubscription$?: Subscription;
  books: number | null = null;
  newSystem$?: Observable<boolean>;
  systemId$?: Observable<string | null>;


  constructor(private http: HttpService, private shareData: ShareDataService, private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.subscription = this.shareData.currentData.subscribe(data => this.bookIndex = data)
    this.newSystem$ = this.store.select(selectNewSystem);
    this.systemId$ = this.store.select(selectSystemId);
    this.booksSubscription$ = this.store.select(selectShelfBooks).pipe(map(item => item !== null && item.filter(i => i.shelfid === this.shelfid)), map(item => item && item.length > 0 && item[0].books)).subscribe(result => {
      this.books = result !== false ? result : null;
    })
  }

  ngOnDestroy() {
    this.shareData.changeData(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.booksSubscription$) {
      this.booksSubscription$.unsubscribe();
    }
  }

  deleteSelf() {
    this.delete.emit();
  }

  editBoard() {
    this.showEditBoard = !this.showEditBoard;
  }

  previewBook(index: number) {
    this.shareData.changeData(index);
  }
}
