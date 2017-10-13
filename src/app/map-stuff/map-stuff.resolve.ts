import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { GoogleMapLoadService } from "../../core/services/google-map-load.service";

@Injectable()
export class MapStuffResolve implements Resolve<any> {
  constructor(
    private googleMapLoad: GoogleMapLoadService,
  ) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let mapResolve = this.googleMapLoad.load();

    return Observable.merge(mapResolve);
  }
}
