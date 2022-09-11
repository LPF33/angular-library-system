import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UuidServiceService } from 'src/app/services/uuid-service.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {
  shelfsystem: (string | 0)[][] = [];
  systemName: string = "";
  systemId: string = "";

  constructor(private uuidService: UuidServiceService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  start(){
    // check if systemName is unique !!!
    this.systemId = this.uuidService.getId();
    this.shelfsystem.push([]);
  }

  addShelf(type: "first" | "last"){
    if(type === "first"){
      this.shelfsystem.unshift([]);
    }else {
      this.shelfsystem.push([]);
    }
  }

  deleteShelf(index: number) {
    this.shelfsystem.splice(index, 1);
  }

  addBoard(shelfIndex: number, type: "board" | "empty"){
    this.shelfsystem[shelfIndex].unshift(type === "board" ? this.uuidService.getId() : 0);
  }

  deleteShelfItem(shelfIndex: number, boardIndex: number){
    this.shelfsystem[shelfIndex].splice(boardIndex,1);
  }

  save(){
    this.storageService.saveShelfSystem(this.systemId, this.systemName, this.shelfsystem);
  }

  checkIfString(str: string | 0):boolean {
    return Boolean(typeof str === 'string');
  }
}
