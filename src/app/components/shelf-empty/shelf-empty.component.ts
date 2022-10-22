import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shelf-empty',
  templateUrl: './shelf-empty.component.html',
  styleUrls: ['./shelf-empty.component.css']
})
export class ShelfEmptyComponent {

  @Output() delete = new EventEmitter();

  constructor() { }

  deleteSelf() {
    this.delete.emit();
  }
}
