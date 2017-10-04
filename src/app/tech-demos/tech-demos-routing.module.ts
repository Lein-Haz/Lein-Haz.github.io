import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechDemosComponent} from "./tech-demos.component";

const routes: Routes = [
  {
    path: 'tech-demos',
    component: TechDemosComponent,
    resolve: {
    }
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class TechDemosRoutingModule {
  public static getRoutes(){
    return routes;
  }
}
