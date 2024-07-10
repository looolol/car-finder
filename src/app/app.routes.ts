import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from "./pages/search/search.component";
import {VinLookupComponent} from "./pages/vin-lookup/vin-lookup.component";

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'vin-lookup', component: VinLookupComponent },
  { path: '', component: HomeComponent },
];
