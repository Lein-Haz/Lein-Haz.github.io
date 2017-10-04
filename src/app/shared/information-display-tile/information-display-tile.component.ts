import {Component, OnInit, Input, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {WindowRef} from "../../../core/services/window.ref";
import {Subscription} from "rxjs";
import {isUndefined} from "util";
import {trigger, state, style, transition, animate, keyframes, group} from "@angular/animations";
import {ConstantService} from "../../../core/services/constant.service";

declare interface ElementPositionData{
  entersViewBotAt: number;
  fullViewBotAt: number;
  fullViewTopAt: number;
  exitsViewTopAt: number;
  halfVisibleBotAt: number;
  halfVisibleTopAt: number;
}

declare interface DisplayData{
  name: string;
  imgSrc: string;
  information: string[];
}

@Component({
  selector: "display-tile",
  templateUrl: './information-display-tile.component.html',
  styleUrls: ['./information-display-tile.component.scss'],
  host: {'[@dispView]':'viewState'},
  animations: [
    trigger('dispView', [
      state(ConstantService.ANIMATION_VIEW_STATES.IN_VIEW, style({
        transform: 'rotateY(0deg) rotateX(0deg) scale(1)',
      })),
      state(ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW, style({
        transform: 'rotateY(90deg) rotateX(0deg) scale(1)',
      })),
      transition(ConstantService.ANIMATION_VIEW_STATES.TRANSITION_INTO_VIEW, [
        style({
          transform: 'rotateY(0deg) rotateX(90deg) scale(0.5)'
        }),
        animate('550ms 150ms cubic-bezier(.75,.23,.32,.82)', style({
          transform: 'rotateX(0deg) scale(1)'
        })),
      ]),
      transition(ConstantService.ANIMATION_VIEW_STATES.TRANSITION_OUT_OF_VIEW, [
        group([
          animate('500ms 100ms cubic-bezier(.1,.56,.3,.82)', style({
            transform: 'rotateY(90deg) scale(0.4)'
          }))
        ])
      ])
    ])
  ]
})

export class InformationDisplayTileComponent implements OnInit, OnDestroy{

  public height:number;

  @Input()
  text: string;
  @Input()
  public displayData: DisplayData;

  @ViewChild('displayTile') tileElement : ElementRef;

  public elementPositionData: ElementPositionData;

  public subscription: Subscription;

  public viewState: string = ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW;

  constructor(
    private windowRef: WindowRef
  ){}

  private initPositionData(){
    let boundingRect = this.tileElement.nativeElement.getBoundingClientRect();
    let halfHeight = (this.tileElement.nativeElement.clientHeight / 2);
    let viewHeight = this.windowRef.nativeWindow().innerHeight;

    this.elementPositionData = {
      entersViewBotAt: boundingRect.top - viewHeight,//top of element = bottom of view
      fullViewBotAt: boundingRect.bottom - viewHeight,//bottom of element = bottom of view
      fullViewTopAt: boundingRect.top,//top of element = top of view
      exitsViewTopAt: boundingRect.bottom,//bottom of element = top of view
      halfVisibleBotAt: (boundingRect.top - viewHeight) + halfHeight,
      halfVisibleTopAt: boundingRect.top + halfHeight,
    };
  }

  onImageLoaded(){
    this.initPositionData();//elements resize after image loads so update position data
  }

  filterScrollsThatICareAbout(val):boolean{
    let inView = (val > this.elementPositionData.halfVisibleBotAt && val < this.elementPositionData.halfVisibleTopAt);
    //let inView = (val > this.elementPositionData.entersViewBotAt && val < this.elementPositionData.exitsViewTopAt);

    this.viewState = (inView) ? ConstantService.ANIMATION_VIEW_STATES.IN_VIEW : ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW;

    return inView;
  }

  private subToScrollSubject(){
    let aThing = this.windowRef.getScrollSubject();
    this.subscription = aThing
      .filter((val)=>this.filterScrollsThatICareAbout(val))
      .subscribe(
      (val)=>{
        //console.log("In IDT, with ID: " + this.text+ " val is: " + val);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("complete");
      }
    );
  }

  logHeightCalls(source: string = 'Nunya'){
    console.log("From " + source + " vals are");
    console.log("Ele client height is " + this.tileElement.nativeElement.clientHeight);
    console.log("Ele offset height is " + this.tileElement.nativeElement.offsetHeight);
    console.log("Ele scroll height is " + this.tileElement.nativeElement.scrollHeight);
    console.log("Done logging " + source + "values");
  }

  logElementPosData(){
    console.log("This is the animation keying data for the component with the \"id\" of " + this.text);
    console.log("This el enters view bot at " + this.elementPositionData.entersViewBotAt);
    console.log("This el is in full view bot at " + this.elementPositionData.fullViewBotAt);
    console.log("This el is in full view top at " + this.elementPositionData.fullViewTopAt);
    console.log("This el leaves view top at " + this.elementPositionData.exitsViewTopAt);
    console.log("This el is half visible bot at: " + this.elementPositionData.halfVisibleBotAt + " (Triggers animation)");
    console.log("This el is half visible top at: " + this.elementPositionData.halfVisibleTopAt + " (Triggers animation)");
    console.log("Done logging elementPositionData values");
  }

  ngOnInit(): void {

    this.initPositionData();
    this.subToScrollSubject();

    if(this.text == "0" ){
      //this.subToScrollSubject();
    }else if(this.text == "3" || this.text == "1"){
      //this.subToScrollSubject();
      //console.log(this.tileElement);
    }else if(this.text == "5"){
      //this.viewState = ConstantService.ANIMATION_VIEW_STATES.IN_VIEW;
    }
  }
  ngOnDestroy(): void {
    console.log("destroy, DESTROY!!");
    if(!isUndefined(this.subscription)){
      this.subscription.unsubscribe();
    }
  }
}
