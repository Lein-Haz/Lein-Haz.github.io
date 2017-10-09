import {Component, OnInit, AfterViewInit, Output} from '@angular/core';
import {MyMap} from "./mapModels/myMap";
import {StoryService} from "../../../core/services/story.service";
import {StoryStepModel} from "../../../core/models/StoryStep.model";
import {StoryModel} from "../../../core/models/Story.model";
import {Observable } from "rxjs";
import {isUndefined} from "util";
import {StoryConstantService} from "../../../core/services/story-constant.service";

@Component({
  selector: 'story-map',
  templateUrl: './story-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class StoryMapComponent implements OnInit, AfterViewInit {
  private storyMap: MyMap;
  public overLayText: string;
  private storyArray: StoryModel[];
  public storyActive: boolean;
  public totalDistance: number = 0;
  public tenMillion: number = 10000000;

  @Output()
  runStory(){
    if(!this.storyActive){
      this.clearMap();//clear previous
      StoryService.lockMap(this.storyMap);//lock interaction
      this.doStory(this.storyMap);//do story
    }
  }

  steppedZoom(map: MyMap, destinationZoomLevel: number){
    if(map.getZoom() !== destinationZoomLevel){
      let zoomObservable = this.storyService.steppedZoom(map, destinationZoomLevel);

      zoomObservable.subscribe(
        (val)=>{
          map.setZoom(val);
        },
        (err)=>{
          console.log(err);
        },
        ()=>{

        }
      );
    }
  }

  public doStory(map: MyMap){
    this.storyActive = true;
    const STORIES = StoryConstantService.STORIES;
    this.storyArray = this.storyService.buildStoryFromConstant(STORIES);

    let wholeStoryObservable: Observable<any>;
    this.storyArray.forEach((story: StoryModel)=>{
      let newObservable = this.storyHandler(story, map);
      if(isUndefined(wholeStoryObservable)){
        wholeStoryObservable = newObservable;
      }else{
        wholeStoryObservable = wholeStoryObservable.concat(newObservable);
      }
    });

    wholeStoryObservable.subscribe(
      (val)=>{
        this.totalDistance += val;
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        StoryService.unlockMap(this.storyMap);
        this.storyActive = false;
      }
    );
  }

  metersToMiles(meters: number):number{
    return StoryService.convertMetersToMiles(meters);
  }

  storyHandler(story: StoryModel, map: MyMap): Observable<any>{
    return Observable.create((sceneObserver)=>{
      let stepObservable;
      story.steps.forEach((storyStep: StoryStepModel, index:number)=>{
        if(isUndefined(stepObservable)){
          stepObservable = this.storyService.setStepDelay(storyStep.delay, index);
        }else{
          stepObservable = stepObservable.concat(this.storyService.setStepDelay(storyStep.delay, index));
        }
      });
      stepObservable.subscribe(
        (stepIndex)=> {
          this.processStep(story.steps[stepIndex], map, story);
        },
        (err)=> {
          console.log("Error happened with story steps");
          console.log(err);
        },
        ()=> {
          setTimeout(()=>{
            this.storyService.closeStory(story);
          }, 1750);
          sceneObserver.next(story.distanceTraveled);
          sceneObserver.complete();
        }
      );
    });
  }

  processStep(storyStep: StoryStepModel, map: MyMap, story: StoryModel){
    this.overLayText = storyStep.text;
    this.steppedZoom(map, storyStep.zoom);
    this.storyService.handleAction(storyStep, map, story);
  }

  clearMap(){
    this.totalDistance = 0;
    StoryService.clearStoryElements(this.storyArray);
  }

  ngAfterViewInit(): void {
    this.mapInit();
  }

  mapInit(){

  }

  mapInitHandler($event){
    this.storyMap = $event;
    this.storyMap.setOptions({
      center: {lat: 48.395315, lng: 9.990424},
      zoom: 14,
      disableDefaultUI: true,
    });
  }

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.overLayText = "This is my story";
  }

}
