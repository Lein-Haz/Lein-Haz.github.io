import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleSigninComponent} from "./google-signin.component";
import {AppMaterialModule} from "../app-material/app-material.module";



@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    GoogleSigninComponent
  ],
  declarations: [GoogleSigninComponent]
})
export class GoogleSigninModule { }
