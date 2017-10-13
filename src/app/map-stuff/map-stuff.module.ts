import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapStuffRoutingModule } from './map-stuff-routing.module';
import { MapStuffComponent } from './map-stuff.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {GoogleMapModule} from "../shared/google-map/google-map.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MapStuffResolve} from "./map-stuff.resolve";

@NgModule({
  imports: [
    CommonModule,
    MapStuffRoutingModule,
    AppMaterialModule,
    GoogleMapModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    MapStuffComponent
  ],
  providers: [MapStuffResolve]
})
export class MapStuffModule { }
