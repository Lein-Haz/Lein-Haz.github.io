import {Injectable} from "@angular/core";
import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";
import {MyMap} from "../../app/shared/google-map/mapModels/myMap";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
import MarkerOptions = google.maps.MarkerOptions;

@Injectable()
export class MapService{

  static markerCount: number = 0;

  public addMarker(position: MyLatLng, map: MyMap, markerId: number, markerOpts?: MarkerOptions): MyMarker{
    let defaultMapOpts: MarkerOptions = {
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    };

    defaultMapOpts = Object.assign(defaultMapOpts, markerOpts);
    let newMarker = new MyMarker(defaultMapOpts);
    newMarker.id = markerId;
    MapService.markerCount++;
    return newMarker;
  }

  static getMarkerCount(){
    return MapService.markerCount;
  }
}
