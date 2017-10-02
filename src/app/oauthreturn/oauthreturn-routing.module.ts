import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OauthreturnComponent} from "./oauthreturn.component";

const routes: Routes = [
  {
    path: 'oauthreturn',
    component: OauthreturnComponent,
    resolve: {
    }
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class OauthreturnRoutingModule {
  public static getRoutes(){
    return routes;
  }
}
