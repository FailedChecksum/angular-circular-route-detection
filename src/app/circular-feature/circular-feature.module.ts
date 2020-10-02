import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircularFeatureRoutingModule } from './circular-feature-routing.module';
import {LandingComponent} from './landing.component';


@NgModule({
  declarations: [LandingComponent],
  exports: [LandingComponent],
  imports: [
    CommonModule,
    CircularFeatureRoutingModule
  ]
})
export class CircularFeatureModule { }
