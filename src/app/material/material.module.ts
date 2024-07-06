import { NgModule } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";


const ngModules = [
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
];

@NgModule({
  declarations: [],
  imports: [ngModules],
  exports: [ngModules],
})
export class MaterialModule { }
