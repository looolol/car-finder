import {Component, Input} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {AutoDevApiCar} from "../models/auto-dev.api-car.model";

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {

  @Input() car: AutoDevApiCar = {};

  currentSlideIndex = 0;

  prevSlide() {
    if (this.currentSlideIndex === 0) {
      this.currentSlideIndex = this.car.photoUrls!.length - 1;
    } else {
      this.currentSlideIndex--;
    }
  }

  nextSlide() {
    if (this.currentSlideIndex === this.car.photoUrls!.length - 1) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex++;
    }
  }
}
