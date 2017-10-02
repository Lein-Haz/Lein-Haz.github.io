import { Component, OnInit } from '@angular/core';
import {StoryService} from "../../core/services/story.service";
import {Observable} from "rxjs";
import {isUndefined} from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public testSize: number = 5;
  public anArray = [];
  constructor(private storyService: StoryService) { }

  ngOnInit() {
    for(let i = 0; i < this.testSize; i++){
      this.anArray.push(2*i);
    }
  }

  more(){
    let addCount = (this.anArray.length < 2)? 2 : this.anArray.length / 2;
    this.delta(this.anArray.length + addCount);
  }

  less(){
    if(this.anArray.length > 0){

      let removeCount = (this.anArray.length < 3) ? this.anArray.length : 3;
      this.delta(this.anArray.length - removeCount);
    }
  }

  delta(newSize: number){
    let removeFlag = (newSize < this.anArray.length);
    let changeAmount = (newSize < this.anArray.length) ? this.anArray.length - newSize : newSize - this.anArray.length;
    let animationObservable: Observable<any>;

    for (let i = 0; i < changeAmount; i++){
      let position = this.anArray.length + (i * ((removeFlag)? -1: 1));
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
          this.anArray.splice(indexSpot);

        }else{
          this.anArray.push((this.anArray.length) * 2);
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
