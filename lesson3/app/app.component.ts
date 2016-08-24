import { Component, OnInit, OnDestroy } from '@angular/core';
import './rxjs-extensions';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
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