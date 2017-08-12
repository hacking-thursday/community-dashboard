import { Component, OnInit, ViewChild } from '@angular/core';

import { MeetupService } from '../services/meetupService'


@Component({
  selector: 'app-total-event-per-week-component',
  templateUrl: './component.html',
})
export class SearchPanel implements OnInit {
  public results = []

  raw = {}
  
  @ViewChild('keywordInput') keywordInput: any
  @ViewChild('hiddenElement') hiddenElement: any

  constructor(private meetupService: MeetupService) {

  }

  runSearch() {
    const key = this.keywordInput.nativeElement.value
    this.search(key)

  }

  search(key: string): any {
    this.meetupService.getEvents().then(data => {
      this.raw = data
      this.results = []
      const re = new RegExp("\\W" + key + "\\W", "g");
      for (const i of this.raw['groups']){
        if (i['events'].length > 0){
            for (const e of i['events']){
              if (!e.hasOwnProperty('text')) {
                this.hiddenElement.nativeElement.innerHTML = e['description']
                e['text'] = this.hiddenElement.nativeElement.innerText.toLowerCase()
              }
              e['group'] = i['name']
              var searchResult = re.exec(e['text'])
              if (searchResult != null) {
                var startIndex = re.lastIndex - key.length 
                if (startIndex < 0){
                  startIndex = 0
                }
                e['short'] = e['text'].slice(startIndex, re.lastIndex + 200)
                this.results.push(e)
              }
            }
        }
      }
    })
  }

  ngOnInit(): void {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
