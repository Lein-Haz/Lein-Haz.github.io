import {IStoryStepModel} from "./IStoryStep.model";
export class StoryStepModel implements IStoryStepModel{
  action: string;
  zoom: number;
  delay: number;
  text?: string;
  latLng?: google.maps.LatLng;
  path: google.maps.LatLng[];

  constructor(action: string, delay: number = 0, text? : string, latLng?: google.maps.LatLng){
    this.action = action;
    this.delay = delay;//defaults to 0
    this.text = text;
    this.latLng = latLng;
  }
}
