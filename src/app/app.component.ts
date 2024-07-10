import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from "./pages/search/search.component";
import {VinLookupComponent} from "./pages/vin-lookup/vin-lookup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    VinLookupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'car-finder';
}
