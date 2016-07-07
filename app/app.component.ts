import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router';

import { HeroService }    from './heroes/hero.service';
import { ErrorPopupComponent } from './error-popup.component';

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <a [routerLink]="['/']">Home</a>
      <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    <error-popup></error-popup>
  `,
  providers:  [
    HeroService
  ],
  directives: [ROUTER_DIRECTIVES, ErrorPopupComponent]
})
export class AppComponent {
  constructor(private router: Router) {
  }
}