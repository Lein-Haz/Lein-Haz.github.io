import { NgModule } from '@angular/core';

import {
  MdSidenavModule, MdListModule, MdButtonModule, MdToolbarModule, MdInputModule,
  MdFormFieldModule, MdCardModule, MdIconModule, MdTooltipModule, MdDialogModule, MdCheckboxModule, MdSnackBarModule
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
    MdSnackBarModule
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
    MdSnackBarModule
  ],
  providers: [],
  bootstrap: []
})
export class AppMaterialModule { }
