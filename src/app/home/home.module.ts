import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {GoogleMapModule} from "../shared/google-map/google-map.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    GoogleMapModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
