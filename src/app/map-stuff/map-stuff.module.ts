import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapStuffRoutingModule } from './map-stuff-routing.module';
import { MapStuffComponent } from './map-stuff.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {GoogleMapModule} from "../shared/google-map/google-map.module";

@NgModule({
  imports: [
    CommonModule,
    MapStuffRoutingModule,
    AppMaterialModule,
    GoogleMapModule
  ],
  declarations: [MapStuffComponent]
})
export class MapStuffModule { }
