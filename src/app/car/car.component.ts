import {Component, Input} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {AutoDevApiCar} from "../models/auto-dev.api-car.model";

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {

  @Input() car: AutoDevApiCar = {};

}
