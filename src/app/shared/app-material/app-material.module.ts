import { NgModule } from '@angular/core';

import {
  MdSidenavModule, MdListModule, MdButtonModule, MdToolbarModule, MdInputModule,
  MdFormFieldModule, MdCardModule, MdIconModule, MdTooltipModule, MdDialogModule, MdCheckboxModule
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
    MdDialogModule,
    MdCheckboxModule
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
    MdDialogModule,
    MdCheckboxModule
  ],
  providers: [],
  bootstrap: []
})
export class AppMaterialModule { }
