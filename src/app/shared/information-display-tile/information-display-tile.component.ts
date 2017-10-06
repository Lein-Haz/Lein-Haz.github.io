import {
  Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit,
  AfterContentInit
} from '@angular/core';
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
  viewTopAnimationThreshold: number;
  viewBotAnimationThreshold: number;
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
      //debug help
      /*state(ConstantService.ANIMATION_VIEW_STATES.IN_VIEW, style({
        //transform: 'rotateY(0deg) rotateX(0deg) scale(1)',
        backgroundColor: '#00FF00'
      })),
      state(ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW, style({
        transform: 'rotateY(90deg) rotateX(0deg) scale(1)',
        backgroundColor: '#FF0000'
      }))*/
      //normal
      state(ConstantService.ANIMATION_VIEW_STATES.IN_VIEW, style({

      })),
      state(ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW, style({
        transform: 'rotateY(90deg) rotateX(0deg) scale(1)'
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

  public viewState: string = ConstantService.ANIMATION_VIEW_STATES.IN_VIEW;//initialize in view for the calcs

  constructor(
    private windowRef: WindowRef
  ){}

  private initPositionData(){//using offsettop
    this.height = this.tileElement.nativeElement.clientHeight;
    let halfHeight = (this.height / 2);
    let quarterHeight = (this.height / 4);
    let viewHeight = this.windowRef.nativeWindow().innerHeight;
    let offsetTop = this.tileElement.nativeElement.offsetTop;

    this.elementPositionData = {
      entersViewBotAt: offsetTop - viewHeight,//top of element = bottom of view
      fullViewBotAt: offsetTop - viewHeight + this.height,//bottom of element = bottom of view
      fullViewTopAt: offsetTop,//top of element = top of view
      exitsViewTopAt: offsetTop + this.height,//bottom of element = top of view
      viewTopAnimationThreshold: offsetTop + (3 * quarterHeight),//ie 3 quarter height
      viewBotAnimationThreshold: (offsetTop - viewHeight) + quarterHeight
    };
  }

  onImageLoaded(){
    this.initPositionData();//elements resize after image loads so update position data
    this.subToScrollSubject();//start listening after load call, since we re-init posData here
  }

  filterScrollsThatICareAbout(val):boolean{
    let inView = (val > this.elementPositionData.viewBotAnimationThreshold && val < this.elementPositionData.viewTopAnimationThreshold);
    this.viewState = (inView) ? ConstantService.ANIMATION_VIEW_STATES.IN_VIEW : ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW;

    return inView;
  }

  private subToScrollSubject(){
    let aThing = this.windowRef.getScrollSubject();
    this.subscription = aThing
      .filter((val)=>this.filterScrollsThatICareAbout(val))
      .subscribe(
      (val)=>{
        //console.log("scroll thing, val: " + val);
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
    console.log("Viewport height is " + this.windowRef.nativeWindow().innerHeight);
    console.log("Done logging " + source + "values");
  }

  logElementPosData(){
    console.log("This is the animation keying data for the component with the \"id\" of " + this.text);
    console.log("This el enters view bot at " + this.elementPositionData.entersViewBotAt);
    console.log("This el is in full view bot at " + this.elementPositionData.fullViewBotAt);
    console.log("This el is in full view top at " + this.elementPositionData.fullViewTopAt);
    console.log("This el leaves view top at " + this.elementPositionData.exitsViewTopAt);
    console.log("This el begins animation bot at: " + this.elementPositionData.viewBotAnimationThreshold + " (Triggers animation)");
    console.log("This el begins animation top at: " + this.elementPositionData.viewTopAnimationThreshold + " (Triggers animation)");
    console.log("Done logging elementPositionData values");
  }

  doStuffFunction(){
    this.logElementPosData();
    this.logHeightCalls();
  }

  ngOnInit(): void {
    this.initPositionData();

    if(this.text == "0" ){
      //this.subToScrollSubject();
    }else if(this.text == "3" || this.text == "1"){
      //this.subToScrollSubject();
      //console.log(this.tileElement);
    }else if(this.text == "5"){
      //this.doStuffFunction();
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
