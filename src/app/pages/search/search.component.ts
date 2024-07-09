import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CarService} from "../../services/car.service";
import {CarComponent} from "../../car/car.component";
import {AutoDevApiCar} from "../../models/auto-dev.api-car.model";
import {SearchFormComponent} from "../../search/search-form/search-form.component";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
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
  isLoading = false;

  constructor(private carService: CarService) {
  }

  search(searchParams: any) {
    console.log('Searching with params:', searchParams);

    this.carService.getCars(searchParams).subscribe(cars => {
      console.log('Filtered Search Results:', cars);
      this.cars = cars;
      this.isLoading = false;
    })
  }

  clear() {
    this.cars = undefined;
    this.isLoading = false;
  }

}
