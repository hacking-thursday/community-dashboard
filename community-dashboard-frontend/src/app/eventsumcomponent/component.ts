import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../services/meetupService'


@Component({
  selector: 'app-event-sum-component',
  templateUrl: './component.html',
})
export class EventSumComponent implements OnInit {
  public chartLabels = [];
  public chartData = [];
  public chartLegend = true;
  public chartType = 'polarArea';

  raw = {}
  data: Map<string, number> = new Map<string, number>()

  constructor(private meetupService: MeetupService) {

  }

  ngOnInit(): void {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      for (const i of this.raw['groups']){
        console.log(i)
        if (i['events'].length > 0) {
          this.data[i['name']] = i['events'].length
        }
      }
      console.log(this.data)
      const label: Array<string> = []
      const value = []

      for (const i in this.data) {
        if (this.data.hasOwnProperty(i)) {
          label.push(i.toString())
          value.push(this.data[i].toString())
        }
      }

      console.log(label)
      console.log(value)

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
