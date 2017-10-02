import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseComponent} from "./base.component";
import {AppResolve} from "../app.resolve";

const routes: Routes = [
  {
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
export class BaseRoutingModule { }
