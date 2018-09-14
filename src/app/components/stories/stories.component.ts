import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DataService } from '../../services/shared.data.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  feedType: string;
  userid: string;

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private dataService: DataService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.dataService.currentMessage.subscribe(message => this.userid = message)
    this.feedType = this.route.snapshot.data['feedType'];
    this.getStories();
  }

  stories = []
  interests: any;
  storiesOfInterests: Stories[];

  fetchStories(): Observable<Data>  {
    let BASE_URL = 'https://hnx.herokuapp.com/user/recommendations?';
    BASE_URL += 'id=' + this.userid;
    
    if (this.feedType == 'top')
      BASE_URL += '&type=top';
    else if (this.feedType == 'new')
      BASE_URL += '&type=new';
    else if (this.feedType == 'ask')
      BASE_URL += '&type=ask';
    else if (this.feedType == 'show')
      BASE_URL += '&type=show';

    return this.http.get<Data>(BASE_URL);
  }

  getStories() {
    this.fetchStories().subscribe(data => {
      this.stories = data.stories;
      this.stories = this.shuffle(this.stories);
      this.spinner.hide();
    });
    
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
}

export interface Stories {
  title: string;
  url: string;
  time: Date;
  author: string;
  points: number;
  comments: number;
  topics: any;
}

export interface Data {
  stories: any[];
  hitsPerPage: number;
  page: number;
}