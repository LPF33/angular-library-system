import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-shelf-edit-board',
  templateUrl: './shelf-edit-board.component.html',
  styleUrls: ['./shelf-edit-board.component.css']
})
export class ShelfEditBoardComponent implements OnInit {

  @Input() index?: number;
  @Input() books: number = 0;
  @Input() id?: string;
  @Output() closeEdit = new EventEmitter();

  booksOnShelf: string[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  close(){
    this.closeEdit.emit();
  }

  addBook(bookId: string){
    this.books++;
    this.booksOnShelf.push(bookId);
    this.storageService.saveShelfBoard(this.id!, this.booksOnShelf);
  }
}
