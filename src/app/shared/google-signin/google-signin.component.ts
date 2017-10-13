import { Component, AfterViewInit, ElementRef, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import {} from '@types/gapi';
import {} from '@types/gapi.auth2';

@Component({
  selector: 'google-signin',
  templateUrl: 'google-signin.component.html'
})
export class GoogleSigninComponent implements AfterViewInit{

  public auth2: any;

  public buttonLabel: string = "Signin";

  public isSignedIn: boolean;

  @Output() authInitializedEmitter: EventEmitter<any> = new EventEmitter();

  @Output()
  signedInState: EventEmitter<any> = new EventEmitter<Object>();

  private clientId: string = "299857897388-97m7915e9nc7rotdkgk9ctgall6s1pr4.apps.googleusercontent.com";

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/plus.me'//seems to be a default one since I didn't explictly add this, and isn't a documented part of google signin
  ].join(' ');

  constructor(private element: ElementRef, private authService: AuthService, private ref: ChangeDetectorRef){}
  private subscribeSignInStatusListener(){
    this.auth2.isSignedIn.listen((isSignedIn) => {
      this.isSignedIn = isSignedIn;

      if(isSignedIn){
        let currentUser = this.authService.getCurrentUser();
        this.buttonLabel = currentUser.getBasicProfile().getName();
      }else{
        this.buttonLabel = "Signin";
      }
      this.signedInState.emit(this.isSignedIn);
      this.ref.detectChanges();
    });
  }

  public googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: 'single_host_origin',
        scope: this.scope
      });
      this.authService.setAuth(this.auth2);

      this.auth2.currentUser.get();
      this.subscribeSignInStatusListener();

      this.authInitializedEmitter.emit(true);

      this.attachToComponent(this.element.nativeElement.firstChild);
    })
  }

  public attachToComponent(element: ElementRef){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      console.log("Emit button label: " + this.buttonLabel);
      let profile = googleUser.getBasicProfile();

      console.log(profile.getFamilyName());
      console.log(profile.getGivenName());
      console.log(profile.getName());
      console.log(profile.getEmail());
    })
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
