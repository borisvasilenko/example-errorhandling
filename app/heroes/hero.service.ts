import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export class Hero {
  constructor(public id: number, public name: string) { }
}

let HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta [Cannot get]'),
  new Hero(16, 'RubberMan [Cannot update]')
];

@Injectable()
export class HeroService {
  getHeroes() { return Observable.of(HEROES).timeout(200).toPromise(); }

  getHero(id: number | string) {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        
        if (id == 15) {
          throw new Error(`Cannot get (ID=${id})`);
        }

        let hero = HEROES.filter(h => h.id === +id)[0];
        resolve(hero);

      }, 200);
    });
  }
}