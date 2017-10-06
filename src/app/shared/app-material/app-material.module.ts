import { NgModule } from '@angular/core';

import {
  MdSidenavModule, MdListModule, MdButtonModule, MdToolbarModule, MdInputModule,
  MdFormFieldModule, MdCardModule, MdIconModule, MdTooltipModule, MdDialogModule
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
    MdIconModule,
    MdTooltipModule,
    MdDialogModule
  ],
  exports: [
    MdSidenavModule,
    MdListModule,
    MdButtonModule,
    MdToolbarModule,
    MdFormFieldModule,
    MdInputModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    MdDialogModule
  ],
  providers: [],
  bootstrap: []
})
export class AppMaterialModule { }
