import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CircularDetectionGuard} from './circular-detection/circular-detection.guard';

const routes: Routes = [
  {
    path: 'circular',
    loadChildren: () => import('./circular-feature/circular-feature.module')
      .then(importSymbol => importSymbol.CircularFeatureModule)
  },
  {
    path: 'good',
    loadChildren: () => import('./good-route-feature/good-route-feature.module')
      .then(importSymbol => importSymbol.GoodRouteFeatureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
