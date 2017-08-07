import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../services/meetupService'


@Component({
  selector: 'app-attending-per-event-component',
  templateUrl: './component.html',
})
export class AttendingPerEventComponent implements OnInit {
  public chartLabels = [];
  public chartData = [];
  public chartLegend = true;
  public chartType = 'polarArea';

  raw = {}
  data: Map<string, [number, number]> = new Map<string, [number, number]>()

  constructor(private meetupService: MeetupService) {

  }

  ngOnInit(): void {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      for (const i of this.raw['groups']){
        if (i['events'].length > 0) {
          let sum = 0
          for (const j of i['events']) {
            sum += j['attending_count']
          }
          this.data[i['name']] = [sum, i['events'].length]
        }
      }
      const label: Array<string> = []
      const value = []

      for (const i in this.data) {
        if (this.data.hasOwnProperty(i)) {
          label.push(i.toString())
          const v = this.data[i]
          value.push((v[0] / v[1]).toString())
        }
      }

      // 這是必要的寫法
      // 否則會觸發 ng-chart 的 bug
      this.chartData = value
      setTimeout( a => {
        this.chartLabels = label
        this.chartData = value
      }, 500)
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
