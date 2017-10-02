import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {isUndefined} from "util";
import {WindowRef} from "../../../core/services/window.ref";
import {ConstantService} from "../../../core/services/constant.service";

@Component({
  selector: 'media-carousel',
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.scss']
})
export class MediaCarouselComponent implements OnInit, OnDestroy {
  constructor(private windowRef: WindowRef) {}

  public picArray = [];

  public currentSrc: string;

  private intervalReference;
  private subscription: Subscription;

  private pictureDelay: number = 18000;
  private pictureIterator: number = 1;//starts at one since we load array[0] in OnInit
  private protraitFlag: boolean = false;

  ngOnInit() {

    let fullUrls = [
      'https://images.unsplash.com/photo-1428094479093-8973a318bd76?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920',
      'https://images.unsplash.com/photo-1435783099294-283725c37230?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920',
      'https://images.unsplash.com/photo-1429794890858-d3016a2bb73c?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920',
      'https://images.unsplash.com/photo-1490598000245-075175152d25?dpr=1&auto=compress,format&fit=crop&fm=jpg&w=1920'
    ];
    this.checkAspectRatio();
    this.currentSrc = this.getRightSize(ConstantService.PICTURE_URLS[0]);
    this.picArray = ConstantService.PICTURE_URLS;
    this.startPictureLoop();
  }

  startPictureLoop(){
    this.intervalReference = setInterval(()=>{
      this.currentSrc = this.getNext();
    }, this.pictureDelay);
  }

  getNext(){
    if(this.pictureIterator >= this.picArray.length){
      this.pictureIterator = 0;
    }
    let baseString = this.picArray[this.pictureIterator];
    this.pictureIterator++;
    this.checkAspectRatio();
    return this.getRightSize(baseString);
  }

  private checkAspectRatio(){
    let viewWidth = this.windowRef.nativeWindow().innerWidth;
    let viewHeight = this.windowRef.nativeWindow().innerHeight;
    this.protraitFlag = (viewHeight > viewWidth);
  }

  private getRightSize(baseUrl: string): string{
    let sizingParam = (this.protraitFlag)? '&h=': '&w=';
    let sizingParamValue = (this.protraitFlag)?
      this.roundHeight(this.windowRef.nativeWindow().innerHeight) :
      WindowRef.getMediaBreakPointFull(this.windowRef.nativeWindow().innerWidth);
    let fitParam = "&fit=crop";// have seen these values for fit: ['clip','crop'] currently not changing
    let fullUrl = baseUrl + fitParam + sizingParam + sizingParamValue;
    return fullUrl;
  }

  private roundHeight(height: number): number{
    let nextInt = Math.ceil(height / 100);//divide by 100, then get the next Int value;
    return nextInt * 100;//multiply by 100 again and return rounded up to 100's value
  }

  private unsubscribeSub(){
    if(!isUndefined(this.subscription)){
      this.subscription.unsubscribe();
    }
    if(!isUndefined(this.intervalReference)){
      clearInterval(this.intervalReference);
    }
  }

  ngOnDestroy(): void {
    console.log("destroy called");
    this.unsubscribeSub();
  }
}
