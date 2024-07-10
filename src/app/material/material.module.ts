import { NgModule } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

const ngModules = [
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatSelectModule,
  MatExpansionModule,
  MatIconModule,
  MatPaginatorModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [],
  imports: [ngModules],
  exports: [ngModules],
})
export class MaterialModule { }
