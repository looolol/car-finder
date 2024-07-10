import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CarService} from "../../services/car.service";
import {CarDetailedComponent} from "../../car/car-detailed/car-detailed.component";
import {AutoDevApiCarDetailed} from "../../models/auto-dev.api-car-detailed.model";

@Component({
  selector: 'app-vin-lookup',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarDetailedComponent,
  ],
  providers: [
    CarService,
  ],
  templateUrl: './vin-lookup.component.html',
  styleUrl: './vin-lookup.component.scss'
})
export class VinLookupComponent {

  vinLookupForm: FormGroup;

  car?: AutoDevApiCarDetailed;

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.vinLookupForm = this.fb.group({
      vin: new FormControl(""),
    });
  }

  onSubmit() {
    console.log('vin', this.vinLookupForm.value.vin);
    this.carService.getCarByVin(this.vinLookupForm.value.vin).subscribe(carDetails => {
      this.car = carDetails;
      console.log('this.car', this.car);
    });
  }

  clearVinLookupForm() {
    this.vinLookupForm.reset();
    this.car = undefined;
  }
}
