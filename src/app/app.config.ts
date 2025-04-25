import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { rootReducer } from './store';
import { AuthenticationEffects } from '@store/authentication/authentication.effects';
import { CalendarEffects } from '@store/calendar/calendar.effects';
import { provideEffects } from '@ngrx/effects';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeatures: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }).providers!,
    // FakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DecimalPipe,
    CookieService,
    provideZoneChangeDetection({
      eventCoalescing: false,
      runCoalescing: false,
      ignoreChangesOutsideZone: true,
    }),
    provideRouter(routes, inMemoryScrollingFeatures),
    provideStore(rootReducer, { metaReducers: [] }),
    importProvidersFrom(BrowserAnimationsModule, BrowserModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthenticationEffects, CalendarEffects),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(FeatherModule.pick(allIcons)),
  ],
};

export const Config = {
  apiUrl: `http://${window.location.hostname}:8080/api`,
};
