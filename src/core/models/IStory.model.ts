import {StoryStepModel} from "./StoryStep.model";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
import {MyPolyline} from "../../app/shared/google-map/mapModels/myPolyline";
export interface IStoryModel{

  text: string;
  startMarker: MyMarker;
  endMarker: MyMarker;
  steps: StoryStepModel[];
  path: MyPolyline;
  distanceTraveled?: number;
}
