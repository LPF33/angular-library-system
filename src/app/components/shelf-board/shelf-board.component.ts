import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, map, filter } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/state.types';
import { selectFoundShelfIdIndex, selectNewSystem, selectShelfBooks, selectSystemId } from 'src/app/state/app.selector';

@Component({
  selector: 'app-shelf-board',
  templateUrl: './shelf-board.component.html',
  styleUrls: ['./shelf-board.component.css']
})
export class ShelfBoardComponent implements OnDestroy {

  @Input() shelfid?: string;
  @Input() onlySVG: boolean = false;

  @Output() delete = new EventEmitter();

  showEditBoard: boolean = false;
  bookIndex$: Observable<number | null>;
  booksLength$: Observable<number | null>;
  systemId$: Observable<string | null>;
  foundShelf$: Observable<number | null>;


  constructor(private shareData: ShareDataService, private store: Store<IAppState>) {
    this.bookIndex$ = shareData.currentData;
    this.systemId$ = this.store.select(selectSystemId);
    this.booksLength$ = this.store.select(selectShelfBooks)
      .pipe(map(item => item && item.filter(i => i.shelfid === this.shelfid)),
        map(item => item && item.length > 0 && item[0].books),
        map(item => item === false ? null : item))
    this.foundShelf$ = this.store.select(selectFoundShelfIdIndex)
      .pipe(filter(item => item.foundShelfId === this.shelfid), map(item => item.foundShelfIndex))
  }

  ngOnDestroy() {
    this.shareData.changeData(null);
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
