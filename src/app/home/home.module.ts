import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {GoogleMapModule} from "../shared/google-map/google-map.module";
import {ScreenTileModule} from "../shared/screen-tile/screen-tile.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {InformationDisplayTileModule} from "../shared/information-display-tile/information-display-tile.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    ScreenTileModule,
    GoogleMapModule,
    FlexLayoutModule,
    InformationDisplayTileModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
