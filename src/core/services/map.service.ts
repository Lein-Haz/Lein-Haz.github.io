import {Injectable} from "@angular/core";
import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";
import {MyMap} from "../../app/shared/google-map/mapModels/myMap";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
import MarkerOptions = google.maps.MarkerOptions;

@Injectable()
export class MapService{


  public addMarker(position: MyLatLng, map: MyMap, title: string = "", markerOpts?: MarkerOptions): MyMarker{
    let defaultMapOpts: MarkerOptions = {
      position: position,
      map: map,
      label: title,
      title: title,
      animation: google.maps.Animation.DROP
    };

    defaultMapOpts = Object.assign(defaultMapOpts, markerOpts);
    return new MyMarker(defaultMapOpts);
  }
}
