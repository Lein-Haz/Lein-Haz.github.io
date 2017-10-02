import { NgModule } from '@angular/core';

import {
  MdSidenavModule, MdListModule, MdButtonModule, MdToolbarModule, MdInputModule,
  MdFormFieldModule, MdCardModule, MdIconModule
} from "@angular/material";

@NgModule({
  declarations: [
  ],
  imports: [
    MdSidenavModule,
    MdListModule,
    MdButtonModule,
    MdToolbarModule,
    MdFormFieldModule,
    MdInputModule,
    MdCardModule,
    MdIconModule
  ],
  exports: [
    MdSidenavModule,
    MdListModule,
    MdButtonModule,
    MdToolbarModule,
    MdFormFieldModule,
    MdInputModule,
    MdCardModule,
    MdIconModule
  ],
  providers: [],
  bootstrap: []
})
export class AppMaterialModule { }
