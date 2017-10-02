import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppMaterialModule} from "../app-material/app-material.module";
import {ScreenTileComponent} from "./screen-tile.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    AppMaterialModule
  ],
  declarations: [
    ScreenTileComponent
  ],
  exports: [
    ScreenTileComponent
  ]
})

export class ScreenTileModule {}
