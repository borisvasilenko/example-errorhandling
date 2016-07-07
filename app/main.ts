import { provide }              from "@angular/core";
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { AppComponent }         from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import 'node_modules/zone.js/dist/long-stack-trace-zone.js';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));