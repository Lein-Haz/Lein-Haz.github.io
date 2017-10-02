import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterContentChecked} from '@angular/core';
import {ConstantService} from "../../../core/services/constant.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit, AfterContentChecked {


  public FLEX_LAYOUT = ConstantService.FLEX_LAYOUT;

  public navHeight: number;

  @Output() navToggle: EventEmitter<any> = new EventEmitter();
  @Output() signedInState: EventEmitter<any> = new EventEmitter();
  @Output() navHeightSize: EventEmitter<any> = new EventEmitter();

  @ViewChild('navref') navRef: ElementRef;

  constructor() {}

  toggleNav(){
    this.navToggle.emit();
  }

  updateStatus($event){
    this.signedInState.emit($event);//pass it along
  }

  authInitializedHandler($event){
    console.log("auth init");
  }

  ngOnInit() {
    /*console.log(this.navRef);

    this.navRef.nativeElement.addEventListener('onresize', ($event)=>{
      console.log("resize handler");
      console.log($event);
    });
    this.navRef.nativeElement.addEventListener('onmouseenter', ($event)=>{
      console.log("click handler");
      console.log($event);
    });*/

  }

  ngAfterContentChecked(): void {
    this.navHeight = this.navRef.nativeElement.children[0].clientHeight;
    this.navHeightSize.emit(this.navHeight);
  }

}
