import {Component} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(router: Router) {
    router.events.pipe(debounceTime(250)).subscribe(_ =>
      this.title = window.location.search.indexOf('circularRoutePreventionTriggered') > -1
        ? 'Circular route detected.'
        : 'Circle route not found');
  }

  title: string;

}

