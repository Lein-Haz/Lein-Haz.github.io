import {IStoryModel} from "./IStory.model";
import {StoryStepModel} from "./StoryStep.model";
import {MyMarker} from "../../app/shared/google-map/mapModels/myMarker";
import {MyPolyline} from "../../app/shared/google-map/mapModels/myPolyline";

export class StoryModel implements IStoryModel{
  text: string;
  startMarker: MyMarker;
  endMarker: MyMarker;
  steps: StoryStepModel[];
  path: MyPolyline;
  distanceTraveled?: number = 0;

  constructor(text: string, steps: StoryStepModel[]){
    this.text = text;
    this.steps = steps;
  }
}
