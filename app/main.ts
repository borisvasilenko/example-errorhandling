import { provide }              from "@angular/core";
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { AppComponent }         from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import { errorServiceInjectables } from "./error.service";

import 'node_modules/zone.js/dist/long-stack-trace-zone.js';

import * as ngCore from '@angular/core';
ngCore.enableProdMode();

function createNgZone() {
    return new ngCore.NgZone({ enableLongStackTrace: true });
}

bootstrap(AppComponent, [
  provide(ngCore.NgZone, {useFactory: createNgZone }),
  APP_ROUTER_PROVIDERS,
  errorServiceInjectables
])
.catch(err => console.error(err));