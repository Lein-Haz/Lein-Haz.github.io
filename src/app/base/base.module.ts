import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import {CoreModule} from "../../core/core.module";
import {AppResolve} from "../app.resolve";

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    CoreModule
  ],
  declarations: [BaseComponent],
  providers: [AppResolve]
})
export class BaseModule { }
