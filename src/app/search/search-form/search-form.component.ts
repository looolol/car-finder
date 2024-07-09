import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  @Input() isLoading: boolean = false;
  @Output() submitEvent = new EventEmitter();
  @Output() clearEvent = new EventEmitter();

  minPrice = 0;
  maxPrice = 99999;

  latitude?: number;
  longitude?: number;
  locationError: GeolocationPositionError | undefined;

  constructor(private fb: FormBuilder) {
    const testForm = this.fb.group({
      make: new FormControl("Chevrolet"),
      model: new FormControl("Camaro"),
      color: new FormControl("yellow"),
      body_style: new FormControl(""),
      price_min: new FormControl(0),
      price_max: new FormControl(40000),
      year_min: new FormControl(2016),
      mileage: new FormControl(40000),
      radius: new FormControl(50),
    });

    this.searchForm = this.fb.group({
      make: new FormControl(""),
      model: new FormControl(""),
      color: new FormControl(""),
      body_style: new FormControl(""),
      price_min: new FormControl(this.minPrice),
      price_max: new FormControl(this.maxPrice),
      year_min: new FormControl(null),
      mileage: new FormControl(null),
      radius: new FormControl(null),
    });

    //this.searchForm = testForm;
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.locationError = undefined;
          }
        },
        (error) => this.locationError = error);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onSubmit() {
    this.isLoading = true;

    const searchParams = { ...this.searchForm?.value, 'latitude': this.latitude, 'longitude': this.longitude};
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === null || searchParams[key] === undefined ||
        searchParams[key] === '' || searchParams[key] === 0) {
        delete searchParams[key];
      }
    })

    this.submitEvent.emit(searchParams);
  }

  clearSearchForm() {
    this.searchForm.reset();
    this.searchForm.get('price_min')?.setValue(this.minPrice)
    this.searchForm.get('price_max')?.setValue(this.maxPrice)

    this.clearEvent.emit();
  }

  formatLabel(value: number): string {
    return Math.round(value / 1000) + 'k';

    return `${value}`;
  }
}
