import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {ConstantService} from "../core/services/constant.service";
import {AuthService} from "../core/services/auth.service";
import {GoogleRef} from "../core/services/google.ref";
import {WindowRef} from "../core/services/window.ref";

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

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

  backUp(){
    this.windowRef.animatedScroll(this.windowRef.nativeWindow().scrollY, 0);
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

  title = 'app';

  constructor(private authService: AuthService, private googleRef: GoogleRef, private windowRef: WindowRef){
    console.log(googleRef.nativeGoogle());
    //console.log(googleRef.nativeGoogle());
  }
}
