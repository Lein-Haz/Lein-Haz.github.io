import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Rx";
import {StoryStepModel} from "../models/StoryStep.model";
import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";
import {StoryModel} from "../models/Story.model";
import {MyPolyline} from "../../app/shared/google-map/mapModels/myPolyline";
import {MyMap} from "../../app/shared/google-map/mapModels/myMap";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";

import {} from '@types/googlemaps';
import SymbolPath = google.maps.SymbolPath;
import spherical = google.maps.geometry.spherical
import {ConstantService} from "./constant.service";
import {isUndefined} from "util";

@Injectable()
export class StoryService{

  constructor( ){ }

  public buildStoryFromConstant(storiesArray):StoryModel[]{
    let storyArray: StoryModel[] = [];
    for(let val of storiesArray){
      let startLL = new MyLatLng(val.startMarker.lat, val.startMarker.lng);
      let endLL = new MyLatLng(val.endMarker.lat, val.endMarker.lng);

      let pathArray = [startLL, endLL];

      let stepsArray: StoryStepModel[] = [];
      for(let stepVal of val.steps){
        let newLatLng: MyLatLng;
        if(stepVal.latLng){
          newLatLng = new MyLatLng(stepVal.latLng.lat, stepVal.latLng.lng);
        }
        let storyStep = new StoryStepModel(stepVal.action, stepVal.delay, stepVal.text, newLatLng);
        storyStep.path = pathArray;
        storyStep.zoom = stepVal.zoom;
        stepsArray.push(storyStep);
      }
      let aStory = new StoryModel(val.text, stepsArray);

      aStory.startMarker = new MyMarker({
        position: startLL
      });
      aStory.endMarker = new MyMarker({
        position: endLL
      });

      storyArray.push(aStory);
    }
    return storyArray;
  }

  public handleAction(storyStep: StoryStepModel , map: MyMap, story){
    switch (storyStep.action){
      case ConstantService.MAP_ACTIONS.FOCUS_LAT_LNG:
        map.panTo(storyStep.latLng);
        break;
      case ConstantService.MAP_ACTIONS.ADD_START_MARKER:
        story.startMarker = this.addMarker(storyStep.latLng, map);
        break;
      case ConstantService.MAP_ACTIONS.ADD_END_MARKER:
        story.endMarker = this.addMarker(storyStep.latLng, map);
        break;
      case ConstantService.MAP_ACTIONS.FOCUS_PATH:
        StoryService.panToPath(storyStep.path[0], storyStep.path[1], map);
        break;
      case ConstantService.MAP_ACTIONS.FOCUS_ADD_PATH:
        StoryService.panToPath(storyStep.path[0], storyStep.path[1], map);
        story.path = this.drawFilledPath(storyStep.path[0], storyStep.path[1], map, story);
        break;
      case ConstantService.MAP_ACTIONS.ADD_PATH:
        story.path = this.drawFilledPath(storyStep.path[0], storyStep.path[1], map, story);
        break;
      default:
        break;
    }
  }

  public addMarker(position: MyLatLng, map: MyMap, title: string = ""): MyMarker{
    return new MyMarker({
      position: position,
      map: map,
      label: title,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: ConstantService.ICON_SHAPES.ACTIVE_CIRCLE
    });
  }

  drawFilledPath(startPoint: MyLatLng, endPoint: MyLatLng, map: MyMap, story: StoryModel): MyPolyline{
    let lineSymbol = {
      path: SymbolPath.FORWARD_OPEN_ARROW,
      scale: 7,
      strokeColor: '#FFB700',
      strokeWeight: 4,
      strokeOpacity: 1,
    };

    let myLine = new MyPolyline({
      strokeColor: '#C4E5E6',
      strokeOpacity: 0.1,
      strokeWeight: 2,
      map: map,
      geodesic: true,
      path: [startPoint,endPoint],
      icons: [
        {
          icon: lineSymbol,
          offset: '0%'
        }
      ]

    });
    let distanceInMeters = spherical.computeDistanceBetween(startPoint, endPoint);
    story.distanceTraveled = Number.parseFloat(distanceInMeters.toFixed(1));

    return this.fillPath(myLine, startPoint, endPoint, map, story);
  }

  fillPath(guideLine: MyPolyline, origin: MyLatLng, end: MyLatLng, map: MyMap, story: StoryModel): MyPolyline{
    let count = 0;
    let fillLine = new MyPolyline({
      strokeColor: '#FFB700',
      strokeOpacity: 1.0,
      strokeWeight: 5,
      zIndex: 2,
      map: map,
      geodesic: true,
      path: [origin,origin],

    });

    let lineAnimate = setInterval(() => {//"fills" path once
      let icons = guideLine.get('icons');
      count = (count + 1) % 200;

      icons[0].offset = (count/2) + '%';

      let pathEnd = spherical.interpolate(origin, end, (count === 0)? 1: ((count/2)/100));
      fillLine.setPath([origin,pathEnd]);
      map.panTo(pathEnd);
      guideLine.set('icons', icons);

      //On first completion
      if(count == 0){
        guideLine.setMap(null);//remove guideLine from map
        fillLine.set('strokeColor', '#4C9CB7');//change color
        fillLine.set('zIndex', 0);//lower zIndex so future animating lines will cover it

        clearInterval(lineAnimate);
      }
    }, 15);

    return fillLine;
  }

  steppedZoom(map: MyMap, destinationZoomLevel: number): Observable<any>{
    let zoomLvlSteps = StoryService.getSteppedZoomArray(map.getZoom(), destinationZoomLevel);
    let zoomObservable: Observable<any>;
    zoomLvlSteps.forEach((zoomLevel: number)=>{
      let newObservable = this.setStepDelay(150, zoomLevel);
      if(isUndefined(zoomObservable)){
        zoomObservable = newObservable;
      }else{
        zoomObservable = zoomObservable.concat(newObservable);
      }
    });
    return zoomObservable;
  }

  static getSteppedZoomArray(currentZoom: number, destinationZoom: number): number[]{
    let zoomDiff = currentZoom - destinationZoom;
    let shouldSubtract: boolean = zoomDiff > 0;
    let zoomAbso = Math.abs(zoomDiff);//positive int value of desired array size
    let zoomLvlSteps: number[] = [];
    do{
      let marginalValue = (shouldSubtract)? -1 : 1;
      let nextZoom = (currentZoom + marginalValue) + (zoomLvlSteps.length * marginalValue);

      zoomLvlSteps.push(nextZoom);
    }while (zoomLvlSteps.length < zoomAbso);
    return zoomLvlSteps;
  }

  public closeStory(story: StoryModel){
    story.startMarker.set('icon',ConstantService.ICON_SHAPES.INACTIVE_CIRCLE);
    story.endMarker.set('icon',ConstantService.ICON_SHAPES.INACTIVE_CIRCLE);
  }

  static panToPath(startPoint: MyLatLng, endPoint: MyLatLng, map: MyMap){
    let pathMidway = spherical.interpolate(startPoint, endPoint, .5);
    map.panTo(pathMidway);
  }

  static lockMap(map: MyMap){
    map.set('gestureHandling','none');
  }
  static unlockMap(map: MyMap){
    map.set('gestureHandling','auto');
  }
  static clearStoryElements(stories: StoryModel|StoryModel[]){
    if(stories && Array.isArray(stories) && stories.length > 0){
      console.log("array clear");
      stories.forEach((story)=>{
        StoryService.mapClearFunction(story);
      });
    }else if(stories){
      StoryService.mapClearFunction(stories as StoryModel);
    }
  }

  static convertMetersToMiles(distanceInMeters: number):number{
    let asMiles = distanceInMeters *
      ConstantService.CONVERSION_CONSTANTS.M_TO_KM_MULTIPLIER *
      ConstantService.CONVERSION_CONSTANTS.KM_TO_MILE_MULTIPLIER;

    return Math.round(asMiles);
  }

  static mapClearFunction(story: StoryModel){
    if(!isUndefined(story.startMarker)){
      story.startMarker.setMap(null);
    }
    if(!isUndefined(story.endMarker)){
      story.endMarker.setMap(null);
    }
    if(!isUndefined(story.path)){
      story.path.setMap(null);
    }
  }

  public setStepDelay(delay: number, index:number): Observable<any>{
    //console.log("creating new delay return, with a delay of " + delay + ", for the index " + index);
    return Observable.create((observer)=>{
      setTimeout(()=>{
        //console.log("In the timeout with a delay of " + delay);
        observer.next(index);
        observer.complete();
      }, delay);
    });
  }
}
