import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MeetupService } from '../services/meetupService';

@Component({
  selector: 'app-event-per-week-component',
  templateUrl: './component.html',
})
export class EventPerWeekComponent implements OnInit {
  raw: any
  public charOptions: any = {
    responsive: true
  };
  public chartLegend = true;
  public chartType = 'radar';
  public chartData: Array<any> = [{label: 'ss', data: [0, 0, 0, 0, 0, 0, 0]}];
  public chartLabels: Array<string> = ['0', '1', '2', '3', '4', '5', '6']
  public chartOptions: any = {
    responsive: true
  };

  constructor(private meetupService: MeetupService) {
  }

  ngOnInit(): void {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      const localCharData = []
      for (const i of this.raw['groups']) {
        if (i['events'].length === 0) {
          continue
        }
        const g = {label: i['name'], data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
        for (const e of i['events']) {
          const t = new Date(e['start_datetime'])
          g.data[t.getDay()] += 1
        }
        localCharData.push(g)
      }
      this.chartData = localCharData
      setTimeout(a => {
        this.chartLabels = ['0', '1', '2', '3', '4', '5', '6']
        this.chartData = localCharData
      })
    })
  }
}
