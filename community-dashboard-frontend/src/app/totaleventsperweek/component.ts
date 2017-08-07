import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../services/meetupService'


@Component({
  selector: 'app-total-event-per-week-component',
  templateUrl: './component.html',
})
export class TotalEventPerWeekComponent implements OnInit {
  public chartLabels = ['0', '1', '2', '3', '4', '5', '6'];
  public chartData = [0, 0, 0, 0, 0, 0, 0]
  public chartLegend = true;
  public chartType = 'polarArea';

  raw = {}
  data: Map<number, number> = new Map<number, number>()

  constructor(private meetupService: MeetupService) {

  }

  ngOnInit(): void {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      for (const i of this.raw['groups']){
        if (i['events'].length > 0){
            for (const e of i['events']){
            const t = new Date(e['start_datetime'])
            const day = t.getDay()
            if (day in this.data){
              this.data[day] += 1
            }else {
              this.data[day] = 1
            }
          }
        }
      }

      const value: number[] = []

      this.chartLabels.forEach( i => {
        value.push(this.data[i])
      })

      // 這是必要的寫法
      // 否則會觸發 ng-chart 的 bug
      this.chartData = value
      setTimeout( a => {
        this.chartLabels = ['0', '1', '2', '3', '4', '5', '6'];
        this.chartData = value
      })
    })
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
