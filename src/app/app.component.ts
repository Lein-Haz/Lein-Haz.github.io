import {Component, AfterViewInit, ElementRef, ViewChild, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit{

  public FLEX_LAYOUT = ConstantService.FLEX_LAYOUT;

  public isSignedIn: boolean;

  public navHeight: number;

  @ViewChild('navref') navRef: ElementRef;

  ngOnInit(): void {
    console.log(this.navRef);
    console.log(this.navRef.nativeElement.children[0].clientHeight);
    this.navHeight = this.navRef.nativeElement.children[0].clientHeight;
  }

  ngAfterViewInit(): void {
    /*this.windowRef.nativeWindow().addEventListener('scroll', ($event)=>{
      //console.log($event);
      //console.log(this.windowRef.nativeWindow().scrollX);
      //console.log(this.windowRef.nativeWindow().scrollY);

    });*/
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
