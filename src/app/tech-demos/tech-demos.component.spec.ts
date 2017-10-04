import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDemosComponent } from './tech-demos.component';

describe('TechDemosComponent', () => {
  let component: TechDemosComponent;
  let fixture: ComponentFixture<TechDemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
