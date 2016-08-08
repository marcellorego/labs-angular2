import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'partials/app.html'
})

export class AppComponent {
    name : string;
    artists: any[];

    constructor() {
        this.name = 'Marcello';
        this.artists = [{
            name:'Artist 1',
            school:'School 1',
            visible : true
        },{
            name:'Artist 2', 
            school:'School 2',
            visible : true
        }];
    }

    onCardClick(item, event) {
        this.name = item.name;
        //console.log(event);
    }

    onCloseClick(item) {
        item.visible = false;
    }

    onAddArtist(value) {
        this.artists.push({
            name: value,
            school: 'School 1'
        })
    }
}