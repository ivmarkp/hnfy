import { Component } from '@angular/core';
import { DataService } from './services/shared.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'hnfy';
  showHeader = false;
  constructor(private dataService:  DataService) {
    this.dataService.currentHeaderState.subscribe(message => this.showHeader = message);
  }
}