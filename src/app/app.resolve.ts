import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GoogleAuthLoadService} from "../core/services/google-auth-load.service";



@Injectable()
export class AppResolve implements Resolve<any> {
  constructor(
    private googleAuthLoad: GoogleAuthLoadService,
  ) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let authResolve = this.googleAuthLoad.load();

    return Observable.merge(authResolve);
  }
}
