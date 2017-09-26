import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { OauthModule } from "./oauth/oauth.module";
import { CoreModule } from "../core/core.module";
import { HttpModule } from "@angular/http";
import { OauthreturnModule } from "./oauthreturn/oauthreturn.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MATERIAL_COMPATIBILITY_MODE } from "@angular/material";
import {AboutModule} from "./about/about.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    OauthModule,
    OauthreturnModule,
    AboutModule,
    CoreModule,
    HttpModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
