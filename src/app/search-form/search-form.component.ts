import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {carMakes, sortOptions} from "../models/search.model";
import {from, map, Observable, startWith} from "rxjs";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  @Input() page: number = 1;
  @Output() submitEvent = new EventEmitter();
  @Output() clearEvent = new EventEmitter();

  makes = carMakes;
  filteredMakes$?: Observable<string[]>;

  minPrice = 0;
  maxPrice = 99999;

  sortOptions = sortOptions;

  latitude?: number;
  longitude?: number;
  locationError: GeolocationPositionError | undefined;

  make: FormControl;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.make = new FormControl();

    this.searchForm = this.fb.group({
      make: this.make,
      model: new FormControl(),
      color: new FormControl(),
      body_style: new FormControl(),
      price_min: new FormControl(),
      price_max: new FormControl(),
      year_min: new FormControl(),
      mileage: new FormControl(),
      radius: new FormControl(),
      sort_filter: new FormControl(),
    });
  }



  ngOnInit() {
    this.route.queryParams.subscribe(value => {
      this.searchForm.patchValue(value);
      console.log('queryParams', value);

      from(this.getLocation()).subscribe(() => {
        if (Object.keys(value).length !== 0) {
          this.submitEvent.emit(this.searchParams);
        }
      });
    });

    this.filteredMakes$ = this.make.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.makes.filter(option => option.toLowerCase().includes(filterValue));
  }

  getLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.locationError = undefined;
              console.log('Got Position', this.latitude, this.longitude);
              resolve();
            }
          },
          (error) => {
            this.locationError = error
            reject(error);
          });
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  get searchParams() {
    const searchParams = { ...this.searchForm?.value, 'latitude': this.latitude, 'longitude': this.longitude, 'page': this.page};
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === null || searchParams[key] === undefined ||
        searchParams[key] === '' || searchParams[key] === 0) {
        delete searchParams[key];
      }
    })

    return searchParams;
  }

  onSubmit() {
    const params = this.searchParams;
    params['page'] = 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    }).then(() => {
      this.submitEvent.emit(params);
    });
  }

  clearSearchForm() {
    this.searchForm.reset();

    this.searchForm.get('price_min')?.setValue(this.minPrice);
    this.searchForm.get('price_max')?.setValue(this.maxPrice);

    this.router.navigate(['/search']);
    this.clearEvent.emit();
  }

  formatLabel(value: number): string {
    return Math.round(value / 1000) + 'k';

    return `${value}`;
  }
}
