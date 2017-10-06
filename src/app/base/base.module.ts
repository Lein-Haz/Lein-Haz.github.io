import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MediaShadeComponent} from "../shared/media-shade/media-shade.component";
import {HomeModule} from "../home/home.module";
import {MapStuffModule} from "../map-stuff/map-stuff.module";
import {OauthreturnModule} from "../oauthreturn/oauthreturn.module";
import {AboutModule} from "../about/about.module";
import {BaseResolve} from "./base.resolve";
import {GoogleSigninModule} from "../shared/google-signin/google-signin.module";
import {NavComponent} from "../shared/nav/nav.component";
import {MediaCarouselComponent} from "../shared/media-shade/media-carousel.component";
import {TechDemosModule} from "../tech-demos/tech-demos.module";
import {FooterComponent} from "../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    HomeModule,
    MapStuffModule,
    OauthreturnModule,
    AboutModule,
    GoogleSigninModule,
    TechDemosModule
  ],
  declarations: [
    BaseComponent,
    MediaShadeComponent,
    MediaCarouselComponent,
    NavComponent,
    FooterComponent
  ],
  providers: [BaseResolve]
})
export class BaseModule { }
