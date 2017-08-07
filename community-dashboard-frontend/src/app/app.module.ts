import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common'
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventSumComponent} from './eventsumcomponent/component';
import { EventPerMonthComponent } from './eventspermonth/component';
import { TotalEventPerWeekComponent} from './totaleventsperweek/component';
import { EventPerWeekComponent} from './eventsperweek/component';
import { AttendingPerEventComponent } from './attendingperevent/component';
import { routing } from './app.routing';
import { MeetupService } from './services/meetupService';

@NgModule({
  declarations: [
    AppComponent, EventSumComponent
    , EventPerMonthComponent, TotalEventPerWeekComponent, EventPerWeekComponent,
    AttendingPerEventComponent
  ],
  imports: [
    BrowserModule, routing, ChartsModule, HttpModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, MeetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
