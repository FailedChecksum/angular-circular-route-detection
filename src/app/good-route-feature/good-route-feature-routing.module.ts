import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './landing-component/landing.component';
import {CircularDetectionGuard} from '../circular-detection/circular-detection.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CircularDetectionGuard],
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodRouteFeatureRoutingModule {
}
