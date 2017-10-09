import {IStoryStepModel} from "./IStoryStep.model";
import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";
import LatLngLiteral = google.maps.LatLngLiteral;
export class StoryStepModel implements IStoryStepModel{
  action: string;
  zoom: number;
  delay: number;
  text?: string;
  latLng?: MyLatLng;
  path: MyLatLng[];

  constructor(action: string, delay: number = 0, text? : string, latLng?: MyLatLng){
    this.action = action;
    this.delay = delay;//defaults to 0
    this.text = text;
    this.latLng = latLng;
  }
}
