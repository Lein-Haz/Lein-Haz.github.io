import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";

import { GoogleMapComponent } from './google-map.component';
import {AppMaterialModule} from "../app-material/app-material.module";
import {StoryMapComponent} from "./story-map.component";
import {HomeMapComponent} from "./home-map.component";


@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  exports:[
    GoogleMapComponent,
    StoryMapComponent,
    HomeMapComponent
  ],
  declarations: [
    GoogleMapComponent,
    StoryMapComponent,
    HomeMapComponent
  ]
})
export class GoogleMapModule { }
