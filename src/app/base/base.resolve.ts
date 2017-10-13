import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GoogleAuthLoadService} from "../../core/services/google-auth-load.service";
import { GoogleMapLoadService } from "../../core/services/google-map-load.service";



@Injectable()
export class BaseResolve implements Resolve<any> {
  constructor(
    private googleAuthLoad: GoogleAuthLoadService,
    private googleMapLoad: GoogleMapLoadService,
  ) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let authResolve = this.googleAuthLoad.load();
    let mapResolve = this.googleMapLoad.load();

    return Observable.merge(authResolve, mapResolve);
  }
}
