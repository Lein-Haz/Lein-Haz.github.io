import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
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

  private static navHeight: number;

  public static getNavHeight(): number{
    return WindowRef.navHeight;
  }

  public static setNavHeight(height: number): void{
    WindowRef.navHeight = height;
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

  /* being used to get url params for picture loads */
  public static getMediaBreakPointFull(width: number){
    if(width < 600){//xs
      return 600;
    }else if(width < 960){//sm
      return 960;
    }else if(width < 1280){//md
      return 1280;
    }else if(width < 1920){//lg
      return 1920;
    }else if(width < 5000){//xl
      //return 5000;
      return 3840;//max image size right now
    }
  }

  private setScrollDelay(delay: number, yPos:number): Observable<any>{
    return Observable.create((observer)=>{
      setTimeout(()=>{
        observer.next(yPos);
        observer.complete();
      }, delay);
    });
  }

  public static windowScrollObserver(window: Window): Observable<any>{
    let scrollObservable = Observable.create((observer)=>{
      window.addEventListener('scroll', ()=>{
        observer.next(window.scrollY);
      });
    });
    return scrollObservable;
  }

  public getScrollSubject(): Subject<any>{
    let window = this.nativeWindow();
    let scrollObservable = WindowRef.windowScrollObserver(window);
    let scrollSubject = new Subject();

    scrollObservable.subscribe(scrollSubject);
    return scrollSubject;
  }

  public checkPortraitOrientation(){
    let viewWidth = this.nativeWindow().innerWidth;
    let viewHeight = this.nativeWindow().innerHeight;
    return (viewHeight > viewWidth);//if higher than wide, then portrait = true
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
