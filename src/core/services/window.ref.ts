import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {isUndefined} from "util";

function _window(): any {
  return window;
}

declare interface ScrollPoint{
  position: number;
  duration: number;
}

@Injectable()
export class WindowRef {
  public nativeWindow(): any {
    return _window();
  }

  public animatedScroll(startY: number, stopY: number){
    let initialY: number = startY;
    let destinationY: number = stopY;
    let scrollingUpFlag = (destinationY < initialY);


    let animateDistance = (destinationY > initialY) ? destinationY - initialY : initialY - destinationY;
    let animationDuration = 550;
    console.log("Animate Distance is: " + animateDistance);
    console.log("Scrolling up is: " + scrollingUpFlag);
    let anArray: ScrollPoint[] = [];

    let totalSteps = 70;

    let stepSize = animateDistance / totalSteps;
    let stepDuration = animationDuration / totalSteps;
    const BASE_WEIGHT = 0.185;
    const STEP_WEIGHT = (1 - BASE_WEIGHT) / totalSteps;
    console.log("Step size is: " + stepSize);
    console.log("Step weight is: " + STEP_WEIGHT);
    console.log("Step duration is: " + stepDuration);
    console.log("Start number is: " + initialY);
    for(let i = 1; i <= totalSteps + 1; i += 1){

      //console.log("Duration oughta: "+ ((stepDuration) * (BASE_WEIGHT + (STEP_WEIGHT * i)) ) );
      //console.log("Duration : "+ ( (BASE_WEIGHT + (STEP_WEIGHT * i)) ) );
      //let thisAdjustedDuration = ((stepDuration * (i - 1)) * (BASE_WEIGHT + (STEP_WEIGHT * i)) - (stepDuration * (i - 2)) * (BASE_WEIGHT + (STEP_WEIGHT * i-1)));
      let thisAdjustedDuration = (stepDuration * (i - 1)) * (BASE_WEIGHT + (STEP_WEIGHT * i));
      let previousAdjustedDuration = (stepDuration * (i - 2)) * (BASE_WEIGHT + (STEP_WEIGHT * (i-1)));
      let stepYPosition = (stepSize * (i - 1)) * (BASE_WEIGHT + (STEP_WEIGHT * i));
      if(scrollingUpFlag){
        stepYPosition = initialY - stepYPosition;
        if(stepYPosition < destinationY){
          console.log("I SHOULD ONLY SEE THIS ONCE OR POSSIBLY NEVER");
          stepYPosition = destinationY;
        }
      }else{
        if(stepYPosition > destinationY){
          console.log("I SHOULD ONLY SEE THIS ONCE OR POSSIBLY NEVER");
          stepYPosition = destinationY;
        }
      }

      //console.log("For index "+ i+"; This dur is: " + thisAdjustedDuration + " last dur is: " + previousAdjustedDuration);

      let scrollPoint: ScrollPoint = {
        position: stepYPosition,
        duration: thisAdjustedDuration - previousAdjustedDuration
      };
      anArray.push(scrollPoint);
    }

    //anArray.reverse();
    console.log(anArray);

    let duraSum = 0;
    anArray.forEach((point: ScrollPoint)=>{
      console.log("summed");
      duraSum += point.duration;
    });

    console.log("Duration sum is " + duraSum);

    this.meScroll(anArray);
  }

  meScroll(scrollPosArray: ScrollPoint[]){
    let scrollObservable = this.steppedScroll(scrollPosArray);

    scrollObservable.subscribe(
      (nextYPosition)=>{
        this.nativeWindow().scrollTo(0, nextYPosition);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("scrolling completed");
      }
    );
  }

  public setStepDelay(delay: number, yPos:number): Observable<any>{
    return Observable.create((observer)=>{
      setTimeout(()=>{
        observer.next(yPos);
        observer.complete();
      }, delay);
    });
  }

  steppedScroll(scrollSteps: ScrollPoint[]): Observable<any>{
    let scrollObservable: Observable<any>;
    scrollSteps.forEach((step)=>{
      let newObservable = this.setStepDelay(step.duration, step.position);
      if(isUndefined(scrollObservable)){
        scrollObservable = newObservable;
      }else{
        scrollObservable = scrollObservable.concat(newObservable);
      }
    });
    return scrollObservable;
  }
}
