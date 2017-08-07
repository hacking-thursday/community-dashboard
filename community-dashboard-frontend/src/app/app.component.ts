import { Component } from '@angular/core';
import { MeetupService } from './services/meetupService'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isValid = false;
  dataUrl = ''

  constructor(service: MeetupService) {
    this.dataUrl = service.eventsUrl
  }

  onSave(event: MouseEvent): void {
    console.log(event);
  }
}
