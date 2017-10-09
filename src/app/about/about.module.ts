import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {GoogleMapModule} from "../shared/google-map/google-map.module";

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    AppMaterialModule,
    GoogleMapModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
