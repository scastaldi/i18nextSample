import { APP_INITIALIZER, ApplicationRef, LOCALE_ID, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ITranslationService, I18NextModule, I18NEXT_SERVICE, defaultInterpolationFormat, I18NextLoadResult} from 'angular-i18next';
import { LogServiceService } from './logger.service';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const i18nextOptions = {
  whitelist: ['en', 'sp'],
  fallbackLng: 'en',
  debug: true, // set debug?
  returnEmptyString: false,
  ns: [
    'translation',
    'validation',
    'error',

    // 'feature.rich_form'
  ],
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  //backend plugin options
  backend: {
    loadPath: 'locale/{{lng}}.json'
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
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
  },
];

type StoreType = {
  //state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};



@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    I18NextModule.forRoot()],
  providers: [
    I18N_PROVIDERS, 
    LogServiceService
  ]
})

export class AppModule {
  constructor(private loggerService: LogServiceService) {
    this.loggerService.logger('testMode:' + document.title);
  }
}
