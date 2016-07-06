import { RouterConfig }          from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';

export const HeroesRoutes: RouterConfig = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroListComponent }
];