import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "../core/core.module";
import { HttpModule } from "@angular/http";
import { OauthreturnModule } from "./oauthreturn/oauthreturn.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MATERIAL_COMPATIBILITY_MODE } from "@angular/material";
import {AboutModule} from "./about/about.module";
import {GoogleSigninModule} from "./shared/google-signin/google-signin.module";
import {HomeModule} from "./home/home.module";
import {MapStuffModule} from "./map-stuff/map-stuff.module";
import {MediaShadeComponent} from "./shared/media-shade/media-shade.component";


@NgModule({
  declarations: [
    AppComponent,
    MediaShadeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    OauthreturnModule,
    AboutModule,
    CoreModule,
    HttpModule,
    FlexLayoutModule,
    GoogleSigninModule,
    HomeModule,
    MapStuffModule
  ],
  providers: [
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
