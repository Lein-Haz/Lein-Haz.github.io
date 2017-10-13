import {StoryStepModel} from "./StoryStep.model";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
export interface IStoryModel{

  text: string;
  startMarker: MyMarker;
  endMarker: MyMarker;
  steps: StoryStepModel[];
  path: google.maps.Polyline;
  distanceTraveled?: number;
}
