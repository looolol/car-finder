import { NgModule } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


const ngModules = [
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [ngModules],
  exports: [ngModules],
})
export class MaterialModule { }
