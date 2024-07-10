import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CarService} from "../../services/car.service";
import {CarComponent} from "../../car/car.component";
import {AutoDevApiCar} from "../../models/auto-dev.api-car.model";
import {SearchFormComponent} from "../../search/search-form/search-form.component";
import {MaterialModule} from "../../material/material.module";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CarComponent,
    SearchFormComponent,
  ],
  providers: [
    CarService,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  cars?: AutoDevApiCar[];
  hits: number | undefined;
  totalCount: number | undefined;
  isLoading = false;
  searchParams: any;

  constructor(private carService: CarService) {
  }

  search(searchParams: any, page: number) {
    //append the page
    this.searchParams = searchParams;
    const params = { ...searchParams, 'page': page};

    console.log('Searching with params:', params);
    this.carService.getCars(params).subscribe(response => {
      console.log('Filtered Search Results: ' , response.records);
      this.cars = response.records;
      this.hits = response.hitCounts;
      this.totalCount = response.totalCount;
      this.isLoading = false;
    });
  }

  clear() {
    this.cars = undefined;
    this.hits = undefined;
    this.totalCount = undefined;
    this.isLoading = false;
    this.searchParams = {};
  }

  page(event$: PageEvent) {
    console.log('Page Event', event$);
    this.isLoading = true;
    this.search(this.searchParams, event$.pageIndex + 1);
  }
}
