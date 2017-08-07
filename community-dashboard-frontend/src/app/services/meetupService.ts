import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MeetupService {
  eventsUrl = 'https://hacking-thursday.github.io/opensourcefeedstw-data/events.json'
  events: any = null

  constructor(private http: Http) {}

  getEvents(): Promise<any> {
    if (this.events != null) {
      return Promise.resolve(this.events)
    }
    return this.http.get(this.eventsUrl)
           .toPromise()
           .then(response => {
             this.events = response.json()
             return this.events
           }).catch(this.handleError);
  }
  handleError(e: any): void {
    console.log(e)
  }

}
