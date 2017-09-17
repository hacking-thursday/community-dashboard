import { Component, OnInit, ViewChild } from '@angular/core';

import { MeetupService } from '../services/meetupService'

import * as Fuse from 'fuse.js'

@Component({
  selector: 'app-total-event-per-week-component',
  templateUrl: './component.html',
})
export class SearchPanel implements OnInit {
  public results = []

  raw = {}
  data = []
  fuse: Fuse = null

  @ViewChild('keywordInput') keywordInput: any
  @ViewChild('hiddenElement') hiddenElement: any

  constructor(private meetupService: MeetupService) {

  }

  runSearch() {
    const key = this.keywordInput.nativeElement.value
    this.search(key)

  }

  createIndex() {
    const options = {
      shouldSort: true,
      tokenize: true,
      includeScore: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      matchAllTokens: true,
      includeMatches: true,
      keys: [
        {name: 'group', weight: 0.7},
        {name: 'text', weight: 0.3}
      ],
      id: 'index'
    }
    this.meetupService.getEvents().then(raw => {
      this.raw = raw
      this.results = []
      let index = 0
      for (const i of this.raw['groups']) {
        if (i['events'].length > 0) {
          for (const e of i['events']) {
            if (!e.hasOwnProperty('text')) {
              this.hiddenElement.nativeElement.innerHTML = e['description']
              e['text'] = this.hiddenElement.nativeElement.innerText.toLowerCase()
            }
            e['group'] = i['name']
            e['index'] = index
            index += 1
            this.data.push(e)
          }
        }
      }
      this.fuse = new Fuse(this.data, options)
    })
  }

  search(key: string): any {
    if (this.fuse === null) {
      this.createIndex()
    } else {
      const fuseOutput = this.fuse.search(key)
      console.log(fuseOutput)
      this.results.length = 0
      for (const i of fuseOutput) {
        let e = this.data[parseInt(i['item'], 10)]
        if (i['matches'].length > 0) {
          e['short'] = i['matches'][0]['value']
        }else{
          e['short'] = ''
        }
        this.results.push(e)
      }
    }
  }

  ngOnInit(): void {
    this.createIndex()
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
