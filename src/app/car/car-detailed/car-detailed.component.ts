import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {CommonModule} from "@angular/common";
import {AutoDevApiCarDetailed} from "../../models/auto-dev.api-car-detailed.model";

@Component({
  selector: 'app-car-detailed',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './car-detailed.component.html',
  styleUrl: './car-detailed.component.scss'
})
export class CarDetailedComponent {

  @Input() car?: AutoDevApiCarDetailed;

}
