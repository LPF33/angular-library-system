import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shelf-empty',
  templateUrl: './shelf-empty.component.html',
  styleUrls: ['./shelf-empty.component.css']
})
export class ShelfEmptyComponent implements OnInit {

  @Input() shelf?: number;
  @Input() index?: number;
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteSelf(){
    this.delete.emit();
  }
}
