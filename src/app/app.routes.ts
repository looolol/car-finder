import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: '', component: HomeComponent },
];
