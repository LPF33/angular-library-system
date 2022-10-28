import { Component, Output, EventEmitter } from '@angular/core';
import { UuidService } from 'src/app/services/uuid.service';
import { IBook } from 'src/app/types';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  @Output() addBook = new EventEmitter<IBook>();

  title: string = "";
  author: string = "";

  constructor(private uuidService: UuidService) { }

  saveBook(event: SubmitEvent) {
    event.preventDefault();
    if (this.title && this.author) {
      const bookId = this.uuidService.getId();
      this.addBook.emit({ bookId, title: this.title, author: this.author });
      this.clearForm();
    }
  }

  clearForm() {
    this.title = "";
    this.author = "";
  }
}
