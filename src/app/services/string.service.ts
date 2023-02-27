import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectLanguage } from '@store/app.selectors';
import type { AppState } from '@interfaces/appState.interface';

@Injectable({
  providedIn: 'root',
})
export class StringService {
  file = require('../strings/strings.json');
  strings = new BehaviorSubject<any>({});
  language$: Observable<string>;

  constructor(private store: Store<{ state: AppState }>) {
    this.language$ = this.store.pipe(select(selectLanguage));
    this.language$.subscribe((language) => {
      this.strings.next(this.file[language]);
    });
  }
}
