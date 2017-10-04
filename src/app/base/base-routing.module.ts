import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseComponent} from "./base.component";
import {HomeRoutingModule} from "../home/home-routing.module";
import {AboutRoutingModule} from "../about/about-routing.module";
import {MapStuffRoutingModule} from "../map-stuff/map-stuff-routing.module";
import {OauthreturnRoutingModule} from "../oauthreturn/oauthreturn-routing.module";
import {BaseResolve} from "./base.resolve";
import {TechDemosRoutingModule} from "../tech-demos/tech-demos-routing.module";

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
      OauthreturnRoutingModule.getRoutes()[0],
      TechDemosRoutingModule.getRoutes()[0]
    ],
    resolve: {
      app: BaseResolve
    }

  },  {
    path: 'base',
    component: BaseComponent,
    resolve: {
      app: BaseResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
  constructor(){}
}
