import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shelf-board',
  templateUrl: './shelf-board.component.html',
  styleUrls: ['./shelf-board.component.css']
})
export class ShelfBoardComponent implements OnInit {

  @Input() shelf?: number;
  @Input() index?: number;
  @Input() id?: string;
  @Input() onlySVG : boolean = false;
  @Input() books: number = 0;

  @Output() delete = new EventEmitter();

  showEditBoard: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  deleteSelf(){
    this.delete.emit();
  }

  editBoard(){
    this.showEditBoard = !this.showEditBoard;
  }

}
