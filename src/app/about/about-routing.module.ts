import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about.component";

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
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
