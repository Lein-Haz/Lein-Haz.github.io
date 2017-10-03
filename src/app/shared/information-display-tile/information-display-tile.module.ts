import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppMaterialModule} from "../app-material/app-material.module";
import {InformationDisplayTileComponent} from "./information-display-tile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    AppMaterialModule
  ],
  declarations: [
    InformationDisplayTileComponent
  ],
  exports: [
    InformationDisplayTileComponent
  ]
})

export class InformationDisplayTileModule {}
