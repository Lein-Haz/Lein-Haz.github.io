import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";
import {Observable} from "rxjs";
import {StoryService} from "../../core/services/story.service";

@Component({
  selector: 'app-tech-demos',
  templateUrl: './tech-demos.component.html',
  styleUrls: ['./tech-demos.component.scss']
})
export class TechDemosComponent implements OnInit {

  public tileArrayInitSize: number = 5;
  public tileArray = [];

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    for(let i = 0; i < this.tileArrayInitSize; i++){//init some tiles
      this.tileArray.push(2*i);
    }
  }

  tileClickHandler($event){
    console.log("You clicked!");
    console.log($event);
  }

  moreTiles(){
    let addCount = (this.tileArray.length < 2)? 2 : this.tileArray.length / 2;
    this.delta(this.tileArray.length + addCount);
  }

  fewerTiles(){
    if(this.tileArray.length > 0){

      let removeCount = (this.tileArray.length < 3) ? this.tileArray.length : 3;
      this.delta(this.tileArray.length - removeCount);
    }
  }

  delta(newSize: number){
    let removeFlag = (newSize < this.tileArray.length);
    let changeAmount = (newSize < this.tileArray.length) ? this.tileArray.length - newSize : newSize - this.tileArray.length;
    let animationObservable: Observable<any>;

    for (let i = 0; i < changeAmount; i++){
      let position = this.tileArray.length + (i * ((removeFlag)? -1: 1));
      position = (removeFlag) ? position - 1 : position;
      if(isUndefined(animationObservable)){
        animationObservable = this.storyService.setStepDelay(150, position);
      }else{
        animationObservable = animationObservable.concat(this.storyService.setStepDelay(150, position));
      }
    }
    animationObservable.subscribe(
      (indexSpot)=> {
        //console.log("so yeah indexSpot is " + indexSpot);
        if(removeFlag){
          this.tileArray.splice(indexSpot);

        }else{
          this.tileArray.push((this.tileArray.length) * 2);
        }
      },
      (err)=> {
        console.log("Error happened");
        console.log(err);
      },
      ()=> {

      }
    );
  }

}
