import {Injectable, OnDestroy} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {noop, ReplaySubject, Subject} from 'rxjs';
import {filter, map, scan, shareReplay, startWith, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircularDetectionService implements OnDestroy {

  constructor(private router: Router) {
    this.CircularReferenceDetected$
      .pipe(takeUntil(this.cancellationToken$))
      .subscribe(noop);
    router.events.pipe(
      filter((change: RouterEvent) => !!change.url && change.url.indexOf('circularRoutePreventionTriggered') === -1),
      map((change: RouterEvent) => change.url),
      takeUntil(this.cancellationToken$)
    )
      .subscribe((url) => {
        this.routeChanges$.next([url, Date.now()]);
      });
  }

  private static readonly OCCURRENCE_LIMIT = 20;
  private static readonly DETECTION_SECONDS = .25;
  private static readonly DETECTION_WINDOW = CircularDetectionService.DETECTION_SECONDS * 1000;

  private readonly CHANGE_BUFFER_SIZE = 20;
  private readonly cancellationToken$ = new Subject();
  private readonly routeChanges$ = new ReplaySubject<[string, number]>(this.CHANGE_BUFFER_SIZE);
  private readonly routeChangeBuffer$ = this.routeChanges$.pipe(
    scan(((acc, value) => [value, ...acc.slice(0, this.CHANGE_BUFFER_SIZE)]), [] as string[]),
    takeUntil(this.cancellationToken$)
  );

  /**
   * Returns a boolean stream indicating whether or not a circular reference has been detected
   */
  readonly CircularReferenceDetected$ = this.routeChangeBuffer$.pipe(
    map(CircularDetectionService.checkIfLimitExceeded),
    startWith(false),
    shareReplay(1)
  );

  private static getCandidateNavigations = (m: [string, number][], now: number) => [...m.values()]
    .filter(([_, time]) =>
      (now - time / CircularDetectionService.DETECTION_WINDOW) < CircularDetectionService.DETECTION_SECONDS);

  private static checkIfLimitExceeded(m: [string, number][]): boolean {
    const counts = [...m.values()];
    return counts.length === 0
      ? false
      : CircularDetectionService.getCandidateNavigations(
      counts,
      Date.now() / CircularDetectionService.DETECTION_WINDOW)
      .length > CircularDetectionService.OCCURRENCE_LIMIT;
  }

  ngOnDestroy(): void {
    this.cancellationToken$.next();
    this.cancellationToken$.complete();
  }
}
