import { Component, OnInit } from '@angular/core';
import {WindowRef} from "../../core/services/window.ref";
import {ConstantService} from "../../core/services/constant.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public techInfoArray = [];

  private window: Window;

  constructor(private windowRef: WindowRef) {
    this.window = this.windowRef.nativeWindow();
  }

  ngOnInit() {
    this.techInfoArray = ConstantService.TECH_INFO_ARRAY;
  }

  scrawlYa(){
    let toTheThing = 0;
    toTheThing = 1980;//item 3 enter
    toTheThing = 761;//item 1 halfway
    toTheThing = 1296;//item 2 enters

    this.windowRef.animatedScroll(this.window.scrollY, toTheThing, 200, 50);
  }
}
