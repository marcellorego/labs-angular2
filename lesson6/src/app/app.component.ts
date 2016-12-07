import { Component, Inject } from '@angular/core';
import { MailService } from './mail-service/mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private mailService:MailService,
    @Inject('mail') private mail,
    @Inject('api') private api) {
  }
  title = 'app works!';
}
