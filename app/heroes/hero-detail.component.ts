import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { Hero, HeroService } from './hero.service';

@Component({
  template: `
  <h2 *ngIf="hero">HERO DETAILS</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <div>
      <label>Weight: </label>
      <input [(ngModel)]="hero.weight" placeholder="weight (Cannot be 0)"/>
    </div>
    <div>
      <label>Height: </label>
      <input [(ngModel)]="hero.height" placeholder="height"/>
    </div>
    <div>
      <label>Height / Weight: </label>
      <input [ngModel]="calculate(hero.height, hero.weight)" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
      <button (click)="update()">Update</button>
      <button (click)="updateAsync()">Async Update</button>
    </p>
  </div>
  `,
  selector: "hero-detail"
})
export class HeroDetailComponent implements OnInit, OnDestroy  {
  hero: Hero;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id'];
       
       if (!id) {
         return;
       }
       
       console.log('hero detail: fetching hero', id);
       this.service.getHero(id).then(hero => this.hero = hero);
     });
  }
  
  update() {
    if (this.hero.id == 16) {
      throw new Error(`Cannot update ID=${this.hero.id}`);
    }
  }

  updateAsync() {
    setTimeout(() => {
      if (0 == 0) {
        if (this.hero.id == 16) {
          throw new Error(`Cannot update (async) ID=${this.hero.id}`);
        }
      }
     });
  }

  calculate(height, weight) {
    if (weight == 0) {
      throw new Error('CANNOT DIVIDE BY ZERO');
    }

    return height / weight;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoHeroes() {
    this.router.navigate(['/heroes']);
  }
}