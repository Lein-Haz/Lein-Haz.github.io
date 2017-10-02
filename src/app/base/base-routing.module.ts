import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseComponent} from "./base.component";
import {AppResolve} from "../app.resolve";
import {HomeRoutingModule} from "../home/home-routing.module";
import {AboutRoutingModule} from "../about/about-routing.module";
import {MapStuffRoutingModule} from "../map-stuff/map-stuff-routing.module";
import {OauthreturnRoutingModule} from "../oauthreturn/oauthreturn-routing.module";

const routes: Routes = [
  {
    path: 'base',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      HomeRoutingModule.getRoutes()[0],
      AboutRoutingModule.getRoutes()[0],
      MapStuffRoutingModule.getRoutes()[0],
      OauthreturnRoutingModule.getRoutes()[0]
    ]
  },  {
    path: 'base',
    component: BaseComponent,
    resolve: {
      app: AppResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
  constructor(){
    console.log("in base route setup");
    console.log(RouterModule);
  }
}
