import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CarService} from "../../services/car.service";
import {CarComponent} from "../../car/car.component";
import {AutoDevApiCar} from "../../models/auto-dev.api-car.model";
import {MaterialModule} from "../../material/material.module";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SearchFormComponent} from "../../search-form/search-form.component";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CarComponent,
    SearchFormComponent,
    RouterModule,
  ],
  providers: [
    CarService,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit {

  cars?: AutoDevApiCar[];
  hasResults = false;
  hits: number | undefined;
  totalCount: number | undefined;
  isLoading = false;
  searchParams: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(value => {
      if (value['page']) {
        this.paginator.pageIndex = value['page'] - 1;  // assuming page is 1-based
      } else {
        this.paginator.pageIndex = 0;
      }
    });
  }

  search(searchParams: any) {
    console.log('Searching with params:', searchParams);

    this.isLoading = true;
    this.carService.getCars(searchParams).subscribe(response => {
      console.log('Filtered Search Results: ' , response.records);
      this.cars = response.records;
      this.hits = response.hitCounts;
      this.totalCount = response.totalCount;
      this.searchParams = searchParams;
      this.hasResults = true;
      if (searchParams['page']) {
        this.paginator.pageIndex = searchParams['page'] - 1;
      }
      this.isLoading = false;
    });
  }

  clear() {
    this.cars = undefined;
    this.hits = undefined;
    this.totalCount = undefined;
    this.isLoading = false;
    this.hasResults = false;
    this.searchParams = {};
  }

  onPage(event$: PageEvent) {
    console.log('Page Event', event$);
    this.searchParams['page'] = event$.pageIndex + 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.searchParams,
      queryParamsHandling: 'merge'
    }).then(() => {
      this.search(this.searchParams);
    });
  }
}
