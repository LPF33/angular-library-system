import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shelf-board',
  templateUrl: './shelf-board.component.html',
  styleUrls: ['./shelf-board.component.css']
})
export class ShelfBoardComponent implements OnInit {

  @Input() shelf?: number;
  @Input() index?: number;
  @Input() systemid?: string;
  @Input() shelfid?: string;
  @Input() onlySVG: boolean = false;
  @Input() books: number = 0;
  @Input() newSystem?: boolean;

  @Output() delete = new EventEmitter();

  showEditBoard: boolean = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    if (this.newSystem === false) {
      this.loadShelf();
    }
  }

  deleteSelf() {
    this.delete.emit();
  }

  editBoard() {
    this.showEditBoard = !this.showEditBoard;
  }

  loadShelf() {
    this.http.get("/v1/shelf/" + this.shelfid).subscribe(response => {
      console.log(response);
    })
  }
}
