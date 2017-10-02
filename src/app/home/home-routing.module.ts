import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
    }
  }
];

@NgModule({
  imports: [/*RouterModule.forChild(routes)*/],
  exports: [RouterModule]
})
export class HomeRoutingModule{
  public static getRoutes(){
    return routes;
  }
}
