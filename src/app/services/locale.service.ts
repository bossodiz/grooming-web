import { Injectable, signal } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private _locale = signal<string>('en');
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService) {
    // set initial language
    this._locale.set(this.translate.currentLang);

    // subscribe to language change
    this.langChangeSub = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this._locale.set(event.lang);
      },
    );
  }

  getLocale() {
    return this._locale;
  }
}
