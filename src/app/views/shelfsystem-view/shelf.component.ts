import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, subscribeOn, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStateShelfSystem, IAppState } from 'src/app/state/state.types';
import { setName, saveNewShelfSystem, loadShelfSystem, addShelf, deleteShelf, addShelfBoard, deleteShelfBoard, resetStore, saveShelfSystem } from 'src/app/state/app.actions';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfSystemViewComponent implements OnInit {

  systemName: string = "";
  systemNameChanged: boolean = false;
  shelfSystem$: Observable<IStateShelfSystem>;

  constructor(private route: ActivatedRoute, private router: Router, private uuidService: UuidService, private store: Store<IAppState>) {
    this.shelfSystem$ = store.select('shelfSystem');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(resetStore());
    if (id !== null) {
      return this.store.dispatch(loadShelfSystem({ id }));
    }
  }

  start() {
    this.store.dispatch(saveNewShelfSystem({ id: this.uuidService.getId(), name: this.systemName }));
  }

  addShelf(type: "first" | "last") {
    this.store.dispatch(addShelf({ add: type }));
  }

  deleteShelf(index: number) {
    this.store.dispatch(deleteShelf({ index }));
  }

  addBoard(shelfIndex: number, type: "board" | "empty") {
    this.store.dispatch(addShelfBoard({ shelfIndex, board: type === "board" ? this.uuidService.getId() : "" }));
  }

  deleteShelfItem(shelfIndex: number, boardIndex: number) {
    this.store.dispatch(deleteShelfBoard({ shelfIndex, boardIndex }));
  }

  inputEvent(event: Event) {
    this.systemNameChanged = true;
    this.systemName = (event.target as HTMLInputElement)?.value ?? "";
  }

  saveName() {
    this.store.dispatch(setName({ name: this.systemName }));
    this.systemNameChanged = false;
  }

  saveShelfSystem() {
    this.store.dispatch(saveShelfSystem());
  }
}
