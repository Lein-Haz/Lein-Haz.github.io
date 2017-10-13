import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";

import { BaseComponent } from './base.component';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {MediaShadeComponent} from "../shared/media-shade/media-shade.component";
import {MediaCarouselComponent} from "../shared/media-shade/media-carousel.component";
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {NavListComponent} from "../shared/nav-list/nav-list.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {GoogleSigninModule} from "../shared/google-signin/google-signin.module";
import {AuthService} from "../../core/services/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {WindowRef} from "../../core/services/window.ref";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ConstantService} from "../../core/services/constant.service";

declare const gapi: any;

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  let FLEX_LAYOUT = ConstantService.FLEX_LAYOUT;

  //let isSignedIn: boolean;
  let windowRef: WindowRef;



  beforeEach(async(() => {
    console.log("ding 1");
    let authServiceStub = {
      auth2: {}
    };
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        AppMaterialModule,
        FlexLayoutModule,
        GoogleSigninModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        BaseComponent,
        NavComponent,
        FooterComponent,
        MediaShadeComponent,
        MediaCarouselComponent,
        NavListComponent
      ],
      providers:[
        {provide: AuthService, useValue: authServiceStub},
        WindowRef,
        { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    console.log("Ding2");
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    //windowRef = new WindowRef();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', ()=>{
    console.log(component);
    let aNumber = 1;
    expect(component.displayText).toEqual('How can I help you?');
    expect(typeof component.navHeight).toBe(typeof aNumber);
    //expect(component.window).toBe(null);
  });
});
