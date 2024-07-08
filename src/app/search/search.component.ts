import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material/material.module";
import {CarService} from "../services/car.service";
import {CarComponent} from "../car/car.component";
import {AutoDevApiCar} from "../models/auto-dev.api-car.model";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarComponent,
  ],
  providers: [
    CarService,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  minPrice = 0;
  maxPrice = 99999;
  sortOptions = [
    { value: "", viewValue: "Best" },
    { value: "price:asc", viewValue: "Least Expensive" },
    { value: "price:desc", viewValue: "Most Expensive" },
    { value: "distance:asc", viewValue: "Nearest" },
    { value: "distance:desc", viewValue: "Farthest" },
    { value: "year:asc", viewValue: "Oldest" },
    { value: "year:desc", viewValue: "Newest" },
    { value: "mileage:asc", viewValue: "Least Miles" },
    { value: "mileage:desc", viewValue: "Most Miles" },
    { value: "created_at:asc", viewValue: "Newest Listings" },
    { value: "created_at:desc", viewValue: "Oldest Listings" },
  ];
  isLoading: boolean | undefined;


  cars?: AutoDevApiCar[];

  latitude?: number;
  longitude?: number;
  locationError: GeolocationPositionError | undefined;

  constructor(private carService: CarService, private fb: FormBuilder) {
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
      sort_filter: new FormControl(""),
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
      sort_filter: new FormControl(""),
    });

    //this.searchForm = testForm;
  }

  ngOnInit() {
    this.getLocation();
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

    console.log('Searching with params:', searchParams);

    this.carService.getCars(searchParams).subscribe(cars => {
      console.log('Filtered Search Results:', cars);
      this.cars = cars;
      this.isLoading = false;
    })
  }

  clearSearchForm($event: MouseEvent) {
    this.searchForm.reset();
    this.searchForm.get('price_min')?.setValue(this.minPrice);
    this.searchForm.get('price_max')?.setValue(this.maxPrice);
    this.searchForm.get('sort_filter')?.setValue("");
    this.cars = undefined;
    this.isLoading = undefined;
  }

  formatLabel(value: number): string {
      return Math.round(value / 1000) + 'k';

    return `${value}`;
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

}
