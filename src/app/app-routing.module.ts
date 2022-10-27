import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfSystemViewComponent } from './views/shelfsystem-view/shelf.component';
import { FindBookViewComponent } from './views/find-book-view/find-book-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LibraryViewComponent } from './views/library-view/library-view.component';

const routes: Routes = [
  { path: "add", component: ShelfSystemViewComponent },
  { path: "add/:id", component: ShelfSystemViewComponent },
  { path: "add/:id/:shelfId/:shelfIndex", component: ShelfSystemViewComponent },
  { path: "search", component: FindBookViewComponent },
  { path: "library", component: LibraryViewComponent },
  { path: "", component: HomeViewComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
