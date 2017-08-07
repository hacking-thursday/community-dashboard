import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MeetupService } from '../services/meetupService';

@Component({
  selector: 'app-event-per-month',
  templateUrl: './component.html',
})
export class EventPerMonthComponent implements OnInit {
  startTime: Date = new Date('2016-01-01 00:00:00')
  endTime: Date = new Date('2016-12-31 23:59:59')
  raw: any
  public charOptions: any = {
    responsive: true
  };
  public chartLegend = true;
  public chartType = 'line';
  public chartData: Array<any> = [{label: 'ss', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}];
  public chartLabels: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  public chartOptions: any = {
    responsive: true
  };

  public groupList: string[] = []
  public checkedGroupList: string[] = []
  @ViewChildren('groupListTemplate') groupListTemplate: QueryList<any>

  constructor(private meetupService: MeetupService) {
  }

  updateWithSelectedGruop(e: Event): void {
    this.checkedGroupList = []
    this.groupListTemplate.forEach(div => {
      if (div.nativeElement.children[0].children[0].checked) {
        this.checkedGroupList.push(div.nativeElement.children[0].innerText.trim())
      }
    });
    this.redrew()
  }

  uncheck(e: Event): void {
    this.groupListTemplate.forEach(ele => {
      ele.nativeElement.children[0].children[0].checked=''
    })
  }

  redrew(): void {
      const localCharData = []
      for (const i of this.raw['groups']) {
        if (i['events'].length === 0) {
          continue
        }
        if (!(this.checkedGroupList.includes(i['name'])) && this.checkedGroupList.length !== 0) {
          continue
        }
        const g = {label: i['name'], data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
        for (const e of i['events']){
          const t = new Date(e['start_datetime'])
          if (t > this.endTime || t < this.startTime) {
            continue
          }
          g.data[t.getMonth()] += 1
        }
        localCharData.push(g)
      }
      console.log(localCharData)
      this.chartData = localCharData
      setTimeout(a => {
        this.chartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10', '11', '12']
        this.chartData = localCharData
      })
  }

  ngOnInit(): void {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      for (const i of this.raw['groups']) {
        if (i['events'].length === 0) {
          continue
        }
        this.groupList.push(i['name'])
      }
      this.groupList.sort()
      this.redrew()
    })
  }
}
