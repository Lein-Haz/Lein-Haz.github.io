import {Component, OnInit} from '@angular/core';
import {ConstantService} from "../../../core/services/constant.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  public FLEX_LAYOUT = ConstantService.FLEX_LAYOUT;

  constructor() {}

  closeNav(){
    console.log("nav should close");
  }

  updateStatus($event){
    console.log($event);
    //this.isSignedIn = $event;
  }


  authInitializedHandler($event){
    console.log($event);
  }

  ngOnInit() {

  }

}
