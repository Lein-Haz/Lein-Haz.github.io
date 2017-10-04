import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./shared/app-material/app-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "../core/core.module";
import { HttpModule } from "@angular/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MATERIAL_COMPATIBILITY_MODE } from "@angular/material";
import {GoogleSigninModule} from "./shared/google-signin/google-signin.module";
import {BaseModule} from "./base/base.module";
import {FooterComponent} from "./shared/footer/footer.component";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    CoreModule,
    HttpModule,
    FlexLayoutModule,
    GoogleSigninModule,
    BaseModule
  ],
  providers: [
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
