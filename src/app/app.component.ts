import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectLanguage, selectTheme } from '@store/app.selectors';
import type { Language } from '@interfaces/language.enum';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  language$: Observable<Language>;
  theme$: Observable<string>;
  constructor(private store: Store<{ state: AppState }>) {
    this.language$ = this.store.pipe(select(selectLanguage));
    this.theme$ = this.store.pipe(select(selectTheme));
  }

  public ngOnInit(): void {
    this.language$.subscribe((lang) => {
      document.getElementsByTagName('html')[0].lang = lang;
    });
    this.theme$.subscribe((theme) => {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add(theme);
      body.classList.remove(
        theme === 'dark-theme' ? 'light-theme' : 'dark-theme'
      );
    });
  }
}
