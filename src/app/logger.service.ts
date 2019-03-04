import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor() {
    this.logger('document.head.title: ' + document.getElementsByTagName('html')[0].title);
  }

  logger(message: String) {
    if (document.getElementsByTagName('html')[0].title === 'debug') {
      console.log(message);
    }
  }
}
