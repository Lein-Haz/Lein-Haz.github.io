import {Injectable} from "@angular/core";
import {MyMarker, ClassLoader} from "../../app/shared/google-map/mapModels/myMarker";
import {ConstantService} from "./constant.service";

@Injectable()
export class MapService{

  static markerCount: number = 0;

  public addMarker(position: google.maps.LatLng, map: google.maps.Map, markerId: number, markerOpts?: google.maps.MarkerOptions): MyMarker{
    let defaultMapOpts: google.maps.MarkerOptions = {
      position: position,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: 'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png'
    };

    defaultMapOpts = Object.assign(defaultMapOpts, markerOpts);
    let MyMarkerClass = ClassLoader();
    let newMarker = new MyMarkerClass(defaultMapOpts);
    newMarker.id = markerId;
    MapService.markerCount++;
    return newMarker;
  }

  drawPath(startPoint: google.maps.LatLng, endPoint: google.maps.LatLng, map: google.maps.Map): google.maps.Polyline{
    let myLine = new google.maps.Polyline({
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
      setTimeout(()=>{
        marker.setAnimation(null);
      }, 2800);
    }else{
      marker.setAnimation(null);
    }
  }

  static getPolyLineLength(line: google.maps.Polyline){
    let latLngArray = line.getPath().getArray();
    let distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(latLngArray[0], latLngArray[1]);
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
