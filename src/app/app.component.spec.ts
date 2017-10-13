import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {RouterOutlet} from "@angular/router";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'asite'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('asite');
  }));

  it('should have a router-outlet component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let theRouter = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(theRouter).not.toBe(null);
  }));
});
