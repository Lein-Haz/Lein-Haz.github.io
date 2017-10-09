import {MyLatLng} from "../../app/shared/google-map/mapModels/myLatLng";

export interface IStoryStepModel{
  action: string;
  zoom: number;
  delay: number;//in milliseconds
  text?: string;
  latLng?: MyLatLng;
  path: MyLatLng[];
}
