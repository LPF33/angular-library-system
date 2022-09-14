import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-shelf-board',
  templateUrl: './shelf-board.component.html',
  styleUrls: ['./shelf-board.component.css']
})
export class ShelfBoardComponent implements OnInit, OnDestroy {

  @Input() shelf?: number;
  @Input() index?: number;
  @Input() systemid?: string;
  @Input() shelfid?: string;
  @Input() onlySVG: boolean = false;
  @Input() books: number = 0;
  @Input() newSystem?: boolean;

  @Output() delete = new EventEmitter();

  showEditBoard: boolean = false;
  bookIndex: number | null = null;
  subscription?: Subscription;

  constructor(private http: HttpService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.subscription = this.shareData.currentData.subscribe(data => this.bookIndex = data)
  }

  ngOnDestroy() {
    this.shareData.changeData(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
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
