import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UuidService } from 'src/app/services/uuid.service';
import { IResultShelfSystem } from 'src/app/types';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  shelfsystem: (string)[][] = [];
  systemName: string = "";
  systemId: string = "";
  alreadySaved: boolean = false;
  newSystem: boolean = true;

  constructor(private route: ActivatedRoute, private uuidService: UuidService, private http: HttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getShelfSystem(id);
    }
  }

  start() {
    this.systemId = this.uuidService.getId();
    this.shelfsystem.push([]);
  }

  addShelf(type: "first" | "last") {
    if (type === "first") {
      this.shelfsystem.unshift([]);
    } else {
      this.shelfsystem.push([]);
    }
  }

  deleteShelf(index: number) {
    this.shelfsystem.splice(index, 1);
  }

  addBoard(shelfIndex: number, type: "board" | "empty") {
    this.shelfsystem[shelfIndex].unshift(type === "board" ? this.uuidService.getId() : "");
  }

  deleteShelfItem(shelfIndex: number, boardIndex: number) {
    this.shelfsystem[shelfIndex].splice(boardIndex, 1);
  }

  save() {
    if (!this.alreadySaved) {
      this.http.post("/v1/shelfsystem/", {
        systemname: this.systemName,
        systemid: this.systemId,
        system: this.shelfsystem
      }).subscribe(response => {
        console.log(response);
        this.alreadySaved = true;
      });
    } else {
      this.http.put("/v1/shelfsystem/", {
        systemname: this.systemName,
        systemid: this.systemId,
        system: this.shelfsystem
      }).subscribe(response => {
        console.log(response);
      });
    }
  }

  getShelfSystem(id: string) {
    this.http.get<IResultShelfSystem>("/v1/shelfsystem/" + id).subscribe(response => {
      if (Array.isArray(response.result) && response.result.length) {
        this.systemName = response.result[0].systemname;
        this.systemId = response.result[0].systemid;
        this.shelfsystem = response.result[0].system;
        this.alreadySaved = true;
        this.newSystem = false;
      }
    })
  }
}
