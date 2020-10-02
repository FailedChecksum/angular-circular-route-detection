import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {CircularDetectionService} from './circular-detection.service';
import {map, mergeMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircularDetectionGuard implements CanActivate {
  constructor(private circularDetection: CircularDetectionService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.circularDetection.CircularReferenceDetected$.pipe(
      tap(result => {
        if (result === true) {
          console.log('circular reference detected, redirecting home');
        }
      }),
      mergeMap(x => x
        ? from(this.router.navigateByUrl('/?circularRoutePreventionTriggered'))
          .pipe(map(_ => _))
        : of(x)),
      map(x => {
        return !x;
      }),
      take(1)
    );
  }

}
