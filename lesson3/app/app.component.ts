import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/heroes">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `
})

///<my-heroes>

export /**
 * AppComponent
 * 
 */
class AppComponent implements OnInit, OnDestroy {
    
  title = 'Tour of Heroes';

  constructor() {
      
  }
  ngOnInit() {
    console.log('init');
  }
  ngOnDestroy() {
    console.log('destroy');
  }
}