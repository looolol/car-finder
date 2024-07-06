import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MaterialModule} from "../material/material.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        MaterialModule,
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
