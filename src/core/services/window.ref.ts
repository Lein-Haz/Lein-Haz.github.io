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

  public animatedScroll(startY: number, stopY: number, animationDuration: number =550, totalSteps: number = 70){
    let initialY: number = startY;
    let destinationY: number = stopY;

    //let animationDuration = 550;
    //let totalSteps = 70;
    let scrollStepsArray: ScrollPoint[] = [];
    let scrollingUpFlag = (destinationY < initialY);
    let animateDistance = (scrollingUpFlag) ? initialY - destinationY : destinationY - initialY;

    let stepSize = animateDistance / totalSteps;
    let stepDuration = animationDuration / totalSteps;
    const BASE_WEIGHT = 0.185;
    const STEP_WEIGHT = (1 - BASE_WEIGHT) / totalSteps;

    for(let i = 1; i <= totalSteps + 1; i += 1){
      let thisAdjustedDuration = (stepDuration * (i - 1)) * (BASE_WEIGHT + (STEP_WEIGHT * i));
      let previousAdjustedDuration = (stepDuration * (i - 2)) * (BASE_WEIGHT + (STEP_WEIGHT * (i-1)));
      let stepYPosition = (stepSize * (i - 1)) * (BASE_WEIGHT + (STEP_WEIGHT * i));
      if(scrollingUpFlag){
        stepYPosition = initialY - stepYPosition;//if scrolling up subtract y-step from starting
        if(stepYPosition < destinationY){//adjustment for last step
          stepYPosition = destinationY;
        }
      }else{
        stepYPosition = initialY + stepYPosition;//if scrolling down add y-step to starting
        if(stepYPosition > destinationY){//adjustment for last step
          stepYPosition = destinationY;
        }
      }

      let scrollPoint: ScrollPoint = {
        position: stepYPosition,
        duration: thisAdjustedDuration - previousAdjustedDuration
      };
      scrollStepsArray.push(scrollPoint);
    }

    this.scrollHandler(scrollStepsArray);
  }

  private scrollHandler(scrollPosArray: ScrollPoint[]){
    let scrollObservable = this.scrollStepObservableBuilder(scrollPosArray);

    scrollObservable.subscribe(
      (nextYPosition)=>{
        this.nativeWindow().scrollTo(0, nextYPosition);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{

      }
    );
  }

  private setScrollDelay(delay: number, yPos:number): Observable<any>{
    return Observable.create((observer)=>{
      setTimeout(()=>{
        observer.next(yPos);
        observer.complete();
      }, delay);
    });
  }

  private scrollStepObservableBuilder(scrollSteps: ScrollPoint[]): Observable<any>{
    let scrollObservable: Observable<any>;
    scrollSteps.forEach((step)=>{
      let newObservable = this.setScrollDelay(step.duration, step.position);
      if(isUndefined(scrollObservable)){
        scrollObservable = newObservable;
      }else{
        scrollObservable = scrollObservable.concat(newObservable);
      }
    });
    return scrollObservable;
  }
}
