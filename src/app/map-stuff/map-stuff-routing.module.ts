import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapStuffComponent} from "./map-stuff.component";

const routes: Routes = [
  {
    path: 'map-stuff',
    component: MapStuffComponent,
    resolve: {
    }
  }
];

@NgModule({
  imports: [/*RouterModule.forChild(routes)*/],
  exports: [RouterModule]
})
export class MapStuffRoutingModule{
  public static getRoutes(){
    return routes;
  }
}
