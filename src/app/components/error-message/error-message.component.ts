import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  @Input() message: null | string = null;
  @Output() clearError = new EventEmitter();

  constructor() { }

  close() {
    this.clearError.emit();
  }
}
