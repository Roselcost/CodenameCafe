import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Language } from '@interfaces/language.enum';
import { StringService } from '@services/string.service';
import { FoodService } from '@services/food.service';
import {
  selectAllergens,
  selectLanguage,
  selectShowAllergens,
  selectTheme,
  selectValidatedPasswords,
} from '@store/app.selectors';
import {
  restoreHiddenItems,
  setAllergen,
  setCurrentOpenDialog,
  setLanguage,
  setShowAllergens,
  setTheme,
  startOver,
  validatePassword,
} from '@store/app.actions';
import { allergenList } from '@interfaces/allergen.interface';
import type { AppState } from '@interfaces/appState.interface';
import type { Allergen } from '@interfaces/allergen.interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  allergens: (Allergen & { label: string })[];
  restrictions: (Allergen & { label: string })[];
  languages: { label: string; id: Language }[];
  allergens$: Observable<string[]>;
  showAllergens$: Observable<boolean>;
  language$: Observable<Language>;
  darkTheme$: Observable<string>;
  validatedPasswords$: Observable<string[]>;
  restaurantData;
  strings;
  password: string;

  constructor(
    private store: Store<{ state: AppState }>,
    private stringService: StringService,
    private foodService: FoodService
  ) {
    this.allergens = this.initializeByType('allergen');
    this.restrictions = this.initializeByType('restriction');
    this.language$ = this.store.pipe(select(selectLanguage));
    this.allergens$ = this.store.pipe(select(selectAllergens));
    this.showAllergens$ = this.store.pipe(select(selectShowAllergens));
    this.darkTheme$ = this.store.pipe(select(selectTheme));
    this.validatedPasswords$ = this.store.pipe(
      select(selectValidatedPasswords)
    );
    this.restaurantData = this.foodService.restaurantData;
    this.languages = [];
    this.password = '';
    this.strings = this.stringService.strings;
    this.strings.subscribe((strings) => {
      this.setLocaleStrings(strings);
    });
  }

  private initializeByType(type: 'allergen' | 'restriction') {
    return allergenList
      .filter((allergen) => {
        const isRestriction = ['vegetarian', 'vegan'].includes(allergen.name);
        return type === 'restriction' ? isRestriction : !isRestriction;
      })
      .map((allergen) => {
        return { ...allergen, label: '' };
      });
  }

  private setLocaleStrings(strings: any) {
    this.languages = [
      { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 ' + strings.english, id: Language.en },
      { label: '🇦🇩 ' + strings.catalan, id: Language.ca },
      { label: '🇪🇸 ' + strings.spanish, id: Language.es },
      { label: '🇫🇷 ' + strings.french, id: Language.fr },
      { label: '🇯🇵 ' + strings.japanese, id: Language.ja },
    ];
    this.allergens = this.allergens.map((allergen: Allergen) => {
      return { ...allergen, label: strings[allergen.name] };
    });
    this.restrictions = this.restrictions.map((allergen: Allergen) => {
      return { ...allergen, label: strings[allergen.name] };
    });
  }

  public validatePassword() {
    this.restaurantData.getValue().passwords.map((password) => {
      if (password.pass === this.password.toLowerCase()) {
        this.store.dispatch(validatePassword({ passwordType: password.type }));
      }
    });
    this.password = '';
  }

  public selectAllergen(allergen: string) {
    this.store.dispatch(setAllergen({ allergen }));
  }

  public showAllergens(show: boolean) {
    this.store.dispatch(setShowAllergens({ show }));
  }

  public setLanguage(language: Language) {
    this.store.dispatch(setLanguage({ language }));
  }

  public restoreHiddenItems() {
    this.store.dispatch(restoreHiddenItems());
  }

  public startOver() {
    this.store.dispatch(startOver());
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }

  public toggleTheme(checked: boolean) {
    const theme = checked ? 'dark-theme' : 'light-theme';
    this.store.dispatch(setTheme({ theme }));
  }
}
