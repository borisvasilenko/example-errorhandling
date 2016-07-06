// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, HeroService }   from './hero.service';

import { HeroDetailComponent } from './hero-detail.component';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    
    <hero-detail>
    </hero-detail>
  `,
  directives: [HeroDetailComponent]
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  private selectedId: number;
  private sub: any;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    console.log('hero list: fetching all heroes (expensive operation)');
    
    this.service.getHeroes()
        .then(heroes => this.heroes = heroes);
        
    this.sub = 
      this.route
        .params
        .subscribe(params => {
          
          this.selectedId = params['id'];
          
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isSelected(hero: Hero) { return hero.id == this.selectedId; }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }

}