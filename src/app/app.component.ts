import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getError } from './state/app.selector';
import { IAppState } from './state/state.types';
import { clearError } from 'src/app/state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  error$: Observable<{ error: boolean, errorMessage: string | null }>;

  constructor(private store: Store<IAppState>) {
    this.error$ = this.store.select(getError);
  }

  clearError() {
    this.store.dispatch(clearError());
  }
}
