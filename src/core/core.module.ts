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
    Services.StoryConstantService,
    Services.StoryService,
    Services.MapService,
    Services.WindowRef,
    Services.GoogleAuthLoadService,
    Services.GoogleMapLoadService,
    Services.UtilService,
  ],
  bootstrap: []
})
export class CoreModule { }
