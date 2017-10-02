import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import {CoreModule} from "../../core/core.module";
import {AppResolve} from "../app.resolve";
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MediaShadeComponent} from "../shared/media-shade/media-shade.component";
import {HomeModule} from "../home/home.module";
import {MapStuffModule} from "../map-stuff/map-stuff.module";
import {OauthreturnModule} from "../oauthreturn/oauthreturn.module";
import {AboutModule} from "../about/about.module";

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    CoreModule,
    FlexLayoutModule,
    AppMaterialModule,
    HomeModule,
    MapStuffModule,
    OauthreturnModule,
    AboutModule
  ],
  declarations: [
    BaseComponent,
    MediaShadeComponent
  ],
  providers: [AppResolve]
})
export class BaseModule { }
