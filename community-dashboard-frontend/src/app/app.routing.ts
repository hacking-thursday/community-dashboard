import { Routes, RouterModule } from '@angular/router';

import {AppComponent} from './app.component'
import { EventSumComponent } from './eventsumcomponent/component'
import { EventPerMonthComponent } from './eventspermonth/component';
import { TotalEventPerWeekComponent } from './totaleventsperweek/component';
import { AttendingPerEventComponent } from './attendingperevent/component';
import { EventPerWeekComponent} from './eventsperweek/component';

const routes: Routes = [
  {path: '', component: EventSumComponent},
  {path: 'eventspermonth',   component: EventPerMonthComponent},
  {path: 'totaleventsperweek',   component: TotalEventPerWeekComponent},
  {path: 'eventsperweek',   component: EventPerWeekComponent},
  {path: 'attendingperevent',   component: AttendingPerEventComponent},
];

export const routing = RouterModule.forRoot(routes);
