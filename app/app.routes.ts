import { provideRouter, RouterConfig }  from '@angular/router';

import { HeroesRoutes }       from './heroes/heroes.routes';

import { Component } from '@angular/core';
@Component({ template: `<h2>HOME</h2>` })
class HomeComponent {}

export const routes: RouterConfig = [
  { path: '',  component: HomeComponent },
  ...HeroesRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];