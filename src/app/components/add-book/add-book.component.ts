import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UuidServiceService } from 'src/app/services/uuid-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Output() addBook = new EventEmitter();

  title: string = "";
  author: string = "";

  constructor(private uuidService: UuidServiceService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  saveBook(event: SubmitEvent){
    event.preventDefault();

    if(this.title && this.author){
      const bookId = this.uuidService.getId();
      this.storageService.saveBook(bookId, this.author, this.title);
      this.addBook.emit(bookId);
      this.clearForm();
    }
  }

  clearForm(){
    this.title = "";
    this.author = "";
  }
}
