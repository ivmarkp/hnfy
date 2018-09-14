import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private showHeader = new BehaviorSubject(false);
  currentHeaderState = this.showHeader.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeHeaderState(message: boolean) {
    this.showHeader.next(message);
  }
}