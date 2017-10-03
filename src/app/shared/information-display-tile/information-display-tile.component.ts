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

@Component({
  selector: "display-tile",
  templateUrl: './information-display-tile.component.html',
  styleUrls: ['./information-display-tile.component.scss'],
  host: {'[@dispView]':'viewState'},
  animations: [
    trigger('dispView', [
      state(ConstantService.ANIMATION_VIEW_STATES.IN_VIEW, style({
        transform: 'rotateY(0deg) rotateX(0deg) scale(1)',
        backgroundColor: '#00FF00'
      })),
      state(ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW, style({
        transform: 'rotateY(0deg) rotateX(90deg) scale(0.5)',
        backgroundColor: '#FF0000'
      })),
      transition(ConstantService.ANIMATION_VIEW_STATES.TRANSITION_INTO_VIEW, [
        style({
          transform: 'rotateY(0deg) rotateX(90deg) scale(0.5)'
        }),
        /*animate('500ms 900ms cubic-bezier(.75,.23,.32,.82)', keyframes([
          style({transform: 'rotateX(80deg) scale(0.3)', offset: 0}),
          style({transform: 'rotateX(70deg) scale(0.4)', offset: 0.33}),
          style({transform: 'rotateX(10deg) scale(0.85)', offset: 0.66}),
          style({transform: 'rotateX(0deg) scale(1)', offset: 1}),
        ])),*/
        animate('550ms 250ms cubic-bezier(.75,.23,.32,.82)', style({
          transform: 'rotateX(0deg) scale(1)'
        })),
      ]),
      transition(ConstantService.ANIMATION_VIEW_STATES.TRANSITION_OUT_OF_VIEW, [
        group([
          animate('900ms cubic-bezier(.1,.56,.3,.82)', style({
            transform: 'rotateY(90deg) scale(0.5)'
          })),
          /*animate('900ms cubic-bezier(.94,.24,.28,.97)', keyframes([
            style({transform: 'rotateY(0deg)', offset: 0}),
            style({transform: 'rotateY(20deg)', offset: 0.33}),
            style({transform: 'rotateY(45deg)', offset: 0.66}),
            style({transform: 'rotateY(90deg)', offset: 1}),
          ])),*/
        ])
      ])
    ])
  ]
})

export class InformationDisplayTileComponent implements OnInit, OnDestroy{

  @Input()
  text: string;

  @ViewChild('meself') meEl : ElementRef;

  public elementPositionData: ElementPositionData;

  public subscription: Subscription;

  public viewState: string = ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW;

  constructor(
    private windowRef: WindowRef
  ){}

  private initPositionData(){
    let boundingRect = this.meEl.nativeElement.getBoundingClientRect();
    let halfHeight = (this.meEl.nativeElement.clientHeight / 2);
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

  filterScrollsThatICareAbout(val):boolean{
    let inView = (val > this.elementPositionData.halfVisibleBotAt && val < this.elementPositionData.halfVisibleTopAt);
    //let inView = (val > this.elementPositionData.entersViewBotAt && val < this.elementPositionData.exitsViewTopAt);

    this.viewState = (inView) ? ConstantService.ANIMATION_VIEW_STATES.IN_VIEW : ConstantService.ANIMATION_VIEW_STATES.NOT_IN_VIEW;

    return inView;
  }

  private doSubby(){
    let aThing = this.windowRef.getScrollSubject();
    this.subscription = aThing
      .filter((val)=>this.filterScrollsThatICareAbout(val))
      .subscribe(
      (val)=>{
        console.log("In IDT, with ID: " + this.text+ " val is: " + val);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("complete");
      }
    );
  }

  private initListener(){
    console.log(this.windowRef.nativeWindow().innerHeight);
  }

  ngOnInit(): void {

    this.initPositionData();
    this.doSubby();

    //this.meEl;
    if(this.text == "0" ){
      this.initListener();
      //this.doSubby();
    }else if(this.text == "3" || this.text == "1"){
      //this.doSubby();
      //console.log(this.meEl);
      //this.initListener();
    }else if(this.text == "4"){
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
