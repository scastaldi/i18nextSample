import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor() {
    this.logger('document.head.title: ' + document.title);
  }

  logger(message: String) {
    // this allows the developer to run on the loginfo from the console
    // by just adding: document.title='debug'
    if (document.title === 'info') {
      console.log(message);
    }
  }
}
