import { Component, Output, EventEmitter } from '@angular/core';
import { UuidService } from 'src/app/services/uuid.service';
import { IBook } from 'src/app/types';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/state.types';
import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { setError } from 'src/app/state/app.actions';
import { HttpService } from 'src/app/services/http.service';

export interface QrcodeResult {
  text: string;
  format?: Html5QrcodeSupportedFormats;
}
export interface Html5QrcodeResult {
  decodedText: string;
  result: QrcodeResult;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  @Output() addBook = new EventEmitter<IBook>();

  title: string = "";
  author: string = "";
  html5Qrcode?: Html5Qrcode;
  scanActive: boolean = false;
  isbn: string = "";
  formatsToSupport: Html5QrcodeSupportedFormats[] = [Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8]

  constructor(private uuidService: UuidService, private store: Store<IAppState>, private http: HttpService) { }

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

  scanISBN() {
    this.scanActive = true;
    this.isbn = "";
    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          let counter = 0;
          this.html5Qrcode = new Html5Qrcode("reader");

          return this.html5Qrcode.start(
            cameraId,
            {
              fps: 10,
              qrbox: 250
            },
            this.onScanSuccess.bind(this),
            () => {
              counter++;
              if (counter > 800) {
                this.stopScanning();
              }
            })
        }
        throw new Error("No camera available");
      }).catch(this.onScanFailure.bind(this));
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    this.isbn = decodedText;
    this.stopScanning();
    this.http.getBookByISBN(decodedText).subscribe((response) => console.log(response));
  }

  onScanFailure(error: any) {
    this.scanActive = false;
    this.store.dispatch(setError({ error: true, message: error }));
  }

  stopScanning() {
    this.scanActive = false;
    this.html5Qrcode?.stop().catch(this.onScanFailure.bind(this));
  }
}
