import {Injectable} from "@angular/core";
import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";
import {MyMap} from "../../app/shared/google-map/mapModels/myMap";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
import MarkerOptions = google.maps.MarkerOptions;
import SymbolPath = google.maps.SymbolPath;
import {MyPolyline} from "../../app/shared/google-map/mapModels/myPolyline";
import spherical = google.maps.geometry.spherical;
import {ConstantService} from "./constant.service";

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

  drawPath(startPoint: MyLatLng, endPoint: MyLatLng, map: MyMap): MyPolyline{
    let myLine = new MyPolyline({
      strokeColor: '#4C9CB7',
      strokeOpacity: 1,
      strokeWeight: 2,
      map: map,
      geodesic: true,
      path: [startPoint,endPoint]
    });

    return myLine;
  }

  public setMarkerSelected(marker: MyMarker, isSelected: boolean){
    if(isSelected){
      let lineSymbol = {
        path: SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 6,
        strokeColor: '#4C9CB7',
        strokeWeight: 4,
        strokeOpacity: 1,
      };
      marker.set("icon", lineSymbol);
      marker.set("label", "Selected");
    }else{
      marker.set("icon", "");
      marker.set("label", "");
    }

  }

  static getPolyLineLength(line: MyPolyline){
    let latLngArray = line.getPath().getArray();
    let distanceInMeters = spherical.computeDistanceBetween(latLngArray[0], latLngArray[1]);
    return distanceInMeters;
  }

  static getMarkerCount(){
    return MapService.markerCount;
  }

  static convertMetersToMiles(distanceInMeters: number):number{
    let asMiles = distanceInMeters *
      ConstantService.CONVERSION_CONSTANTS.M_TO_KM_MULTIPLIER *
      ConstantService.CONVERSION_CONSTANTS.KM_TO_MILE_MULTIPLIER;

    return Math.round(asMiles);
  }
}
