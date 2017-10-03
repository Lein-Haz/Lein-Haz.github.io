import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterContentChecked} from '@angular/core';
import {ConstantService} from "../../../core/services/constant.service";
import {WindowRef} from "../../../core/services/window.ref";

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

  }

  ngAfterContentChecked(): void {
    this.navHeight = this.navRef.nativeElement.children[0].clientHeight;
    WindowRef.setNavHeight(this.navHeight);
    this.navHeightSize.emit(this.navHeight);
  }

}
