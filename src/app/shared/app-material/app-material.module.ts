import { NgModule } from '@angular/core';

import {
  MdSidenavModule, MdListModule, MdButtonModule, MdToolbarModule, MdInputModule,
  MdFormFieldModule, MdCardModule, MdIconModule, MdTooltipModule, MdDialogModule, MdCheckboxModule, MdSnackBarModule,
  MdChipsModule
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
    MdCheckboxModule,
    MdSnackBarModule,
    MdChipsModule
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
    MdCheckboxModule,
    MdSnackBarModule,
    MdChipsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppMaterialModule { }
