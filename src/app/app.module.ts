import { APP_INITIALIZER, ApplicationRef, LOCALE_ID, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ITranslationService, I18NextModule, I18NEXT_SERVICE, defaultInterpolationFormat } from 'angular-i18next';
import i18nextLanguageDetector from 'i18next-browser-languagedetector';
import i18nextXHRBackend from 'i18next-xhr-backend';
import { debug } from 'util';
import { LogServiceService } from './logger.service';
import * as moment from 'moment';
const options = {
  whitelist: ['en', 'es'],
  fallbackLng: 'en',
  backend: {
    loadPath: '/locale/{{lng}}.json'
  },
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'uppercase') { return value.toUpperCase(); }
      if (value instanceof Date) {
          moment.locale(lng);
        return moment(value).format(format);
      }
      return value;
    }
  }
};

export function appInit(i18next: ITranslationService) {
  return () => i18next
  .use(i18nextXHRBackend)
  .use(i18nextLanguageDetector)
  .init(options);
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];



@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    I18NextModule.forRoot()],
  providers: [I18N_PROVIDERS, LogServiceService]
})

export class AppModule {
  constructor(private loggerService: LogServiceService) {
    this.loggerService.logger('testMode:' + document.title);
  }
}
