import {Component, OnInit} from '@angular/core';
import {ConstantService} from "../../core/services/constant.service";
import {AuthService} from "../../core/services/auth.service";
import {WindowRef} from "../../core/services/window.ref";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public FLEX_LAYOUT = ConstantService.FLEX_LAYOUT;

  public isSignedIn: boolean;

  public window: Window;
  public navHeight: number;

  ngOnInit(): void {
    this.window = this.windowRef.nativeWindow();
  }

  scrollHandler($event){
    this.windowRef.animatedScroll(this.window.scrollY, this.window.innerHeight - this.navHeight);
  }

  updateStatus($event){
    this.isSignedIn = $event;
  }

  updateNavHeight($event){
    this.navHeight = $event;
  }

  logout(){
    this.authService.logout();
  }

  constructor(private authService: AuthService, private windowRef: WindowRef){

  }

}
