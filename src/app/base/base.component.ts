import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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

  @ViewChild('navref') navRef: ElementRef;

  ngOnInit(): void {
    this.navHeight = this.navRef.nativeElement.children[0].clientHeight;
    this.window = this.windowRef.nativeWindow();
  }

  scrollHandler($event){
    this.navHeight = this.navRef.nativeElement.children[0].clientHeight;
    this.windowRef.animatedScroll(this.window.scrollY, this.window.innerHeight - this.navHeight);
  }

  updateStatus($event){
    this.isSignedIn = $event;
  }

  authInitializedHandler($event){
    let authInstance = this.authService.getAuth();
    this.isSignedIn = authInstance.isSignedIn.get();
  }

  logout(){
    this.authService.logout();
  }

  constructor(private authService: AuthService, private windowRef: WindowRef){

  }

}
