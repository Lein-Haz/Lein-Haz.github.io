import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechDemosRoutingModule } from './tech-demos-routing.module';
import { TechDemosComponent } from './tech-demos.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {ScreenTileModule} from "../shared/screen-tile/screen-tile.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NopeSnackComponent} from "./nope-snack/nope-snack.component";

@NgModule({
  imports: [
    CommonModule,
    TechDemosRoutingModule,
    AppMaterialModule,
    ScreenTileModule,
    FlexLayoutModule
  ],
  declarations: [
    TechDemosComponent,
    NopeSnackComponent
  ],
  entryComponents: [
    NopeSnackComponent
  ]
})
export class TechDemosModule { }
