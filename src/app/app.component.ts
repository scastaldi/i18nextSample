import { Component, Inject, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { LogServiceService } from './logger.service';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  language = 'es';
  languages: string[] = ['en', 'es'];
  isError: Boolean = false;
  errors: string[] = ['404', 'Unknown'];
  error = '';
  people: Number = 0;
  mydate: Date = new Date();

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService, private loggerService: LogServiceService) {
    this.loggerService.logger('testMode:' + document.getElementsByTagName('html')[0].title);
  }

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.loggerService.logger('updateState:' + this.i18NextService.language);
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string) {
    if (lang !== this.i18NextService.language) {
      this.loggerService.logger('changeLanguage:' + lang);
      this.i18NextService.changeLanguage(lang).then(x => {
        this.loggerService.logger('updateState:' + this.i18NextService.language);
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  errorTriggered(description: string) {
    this.loggerService.logger('people:' + this.people);
    if (description === 'clear') {
      this.isError = false;
      this.error = '';
      this.loggerService.logger('error:' + this.error);
    } else {
      this.isError = true;
      this.error = 'error.' + description;
      this.loggerService.logger('error:' + this.error);
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }
}
