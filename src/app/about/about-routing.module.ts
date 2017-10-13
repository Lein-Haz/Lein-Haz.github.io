import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about.component";
import {MapStuffResolve} from "../map-stuff/map-stuff.resolve";

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
      maps: MapStuffResolve
    }
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AboutRoutingModule{
  public static getRoutes(){
    return routes;
  }
}
