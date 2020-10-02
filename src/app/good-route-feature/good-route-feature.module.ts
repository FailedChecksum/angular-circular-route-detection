import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodRouteFeatureRoutingModule } from './good-route-feature-routing.module';
import { LandingComponent } from './landing-component/landing.component';


@NgModule({
  declarations: [LandingComponent],
  exports: [LandingComponent],
  imports: [
    CommonModule,
    GoodRouteFeatureRoutingModule
  ]
})
export class GoodRouteFeatureModule { }
