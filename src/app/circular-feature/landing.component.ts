import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, of, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {delay, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-landing-component',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(router: Router) {

    router.navigateByUrl(router.url === '/circular'
      ? '/circular/redir'
      : '/circular');

  }

  private readonly cancellationToken$ = new Subject();

  ngOnDestroy(): void {
    this.cancellationToken$.next();
    this.cancellationToken$.complete();
  }

  ngOnInit(): void {
  }

}
