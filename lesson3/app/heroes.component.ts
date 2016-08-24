import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  
  addingHero:boolean;
  error: any;
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private router: Router,
    private heroService: HeroService) {
  }
  ngOnInit() {
    this.getHeroes();
  }
  ngOnDestroy() {
    console.log('destroy');
  }
  getHeroes() {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes);

    /*var self = this;
    this.heroService.getHeroes()
      .then(function(heroes){
        self.heroes = heroes;
      });*/
  }
  onSelect(hero: Hero) {
    if (hero === this.selectedHero) {
      delete this.selectedHero;
    } else {
      this.selectedHero = hero;
    }
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }

}