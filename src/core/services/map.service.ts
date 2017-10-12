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
      animation: google.maps.Animation.DROP,
      icon: 'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png'
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

  public setMarkerSelected(marker: MyMarker, selectedPosition?: number){
    if(marker.selected){
      let url = this.getUrl(selectedPosition);
      marker.set("icon", url);
      marker.set("title", "Selected");
    }else{
      marker.set("icon", "https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png");
      marker.set("title", "");
    }
  }

  getUrl(selectedPosition: number){
    let retUrl = '';
    if(selectedPosition == 0){
      retUrl = "https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff004C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1&text=1";
    }else{
      retUrl = "https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff004C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=2";
    }
    return retUrl;
  }

  static bounceMarker(marker: MyMarker){
    let anim = marker.getAnimation();
    if(!anim && !marker.selected){

      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(($event)=>{
        console.log($event);
        marker.setAnimation(null);
      }, 2800);
    }else{
      marker.setAnimation(null);
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
