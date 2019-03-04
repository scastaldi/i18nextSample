# i18nextSample
i18next prove of concept, to highlight how to setup and some of the functionality that I can use in my project 
### https://www.i18next.com/
### angular sample: https://github.com/Romanchuk/angular-i18next
### install
```
 npm install i18next --save
 npm install angular-i18next --save
```

## simple translation
```
<h1>
    {{ 'sampletest' | i18next }}!
</h1>
```

## translation passing params
```
<div>
  <input [(ngModel)]="people" type="number" id=quantity name="quantity" min=0 max=50>
  {{ 'key' | i18next: {count: people} }}
</div>
```

## using plurals
to use plural only have to setup the same variable name with: _plural
```
    "key": "articulo",
    "key_plural": "articulos",
    "keyWithParam": "Usted selecciono {{count}} articulo",
    "keyWithParam_plural": "Usted selecciono {{count}} articulos",
```

## default values
A default translation value can be assigned in case the application have a variable that has not been translated
### in code
```
<div>
  <button (click)="errorTriggered('404')">404 Error</button>
  <button (click)="errorTriggered('500')">500 Error</button>
  <button (click)="errorTriggered('unknown')">Any other error</button>
  <button (click)="errorTriggered('clear')">Clear</button>
  <div *ngIf="isError">
    {{ [error, 'error.default'] | i18next }}
  </div>
</div>
```
### in translation file
```
    "error": {
        "404": "Page not found",
        "default": "An error occurred, please contact Support"
    }
```

## date formats
i18next uses moment to format the dates, please refer to moment for more documentation. In the appModule during the init() the format can be setup 

## sample options
```
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
        // this helps change the format and local of momentjs
        console.log(`value: ${value}, format: ${format}, lng: ${lng}`);
        moment.locale(lng);
        return moment(value).format(format);
      }
      return value;
    }
  }
};
```