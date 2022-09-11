import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookViewComponent } from './views/add-book-view/add-book-view.component';
import { FindBookViewComponent } from './views/find-book-view/find-book-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';

const routes: Routes = [
  { path: "add", component: AddBookViewComponent },
  { path: "search", component: FindBookViewComponent },
  { path: "", component: HomeViewComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
