import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechDemosRoutingModule } from './tech-demos-routing.module';
import { TechDemosComponent } from './tech-demos.component';

@NgModule({
  imports: [
    CommonModule,
    TechDemosRoutingModule
  ],
  declarations: [TechDemosComponent]
})
export class TechDemosModule { }
