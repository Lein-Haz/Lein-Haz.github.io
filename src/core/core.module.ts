import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as Services from "./services/services";


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule
  ],
  exports: [

  ],
  providers: [
    Services.AuthService,
    Services.ApiService,
    Services.ConstantService,
    Services.StoryService,
    Services.GoogleRef,
    Services.WindowRef,
  ],
  bootstrap: []
})
export class CoreModule { }
