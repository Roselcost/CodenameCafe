import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import {
  selectAllergens,
  selectSelectedItem,
  selectOrderItems,
  selectLanguage,
  selectRestaurant,
  selectHiddenItems,
  selectValidatedPasswords,
} from '@store/app.selectors';
import { allergenList } from '@interfaces/allergen.interface';
import type { Allergen } from '@interfaces/allergen.interface';
import type { Category, mappedCategory } from '@interfaces/category.interface';
import type { Item, mappedItem } from '@interfaces/item.interface';
import type { OrderItem } from '@interfaces/orderItem.interface';
import type { AppState } from '@interfaces/appState.interface';
import type { Language } from '@interfaces/language.enum';
import type { RestaurantData } from '@interfaces/restaurantData.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  file: any;
  menu = new BehaviorSubject<mappedCategory[]>([]);
  restaurantData = new BehaviorSubject<RestaurantData>({
    id: '',
    name: '',
    description: {},
    icon: '',
    passwords: [],
  });
  allergens$: Observable<string[]>;
  orderItems$: Observable<OrderItem[]>;
  selectedItem$: Observable<number>;
  currentLanguage$: Observable<Language>;
  currentRestaurant$: Observable<string>;
  hiddenItems$: Observable<number[]>;
  validatedPasswords$: Observable<string[]>;

  constructor(private store: Store<{ state: AppState }>) {
    this.allergens$ = this.store.pipe(select(selectAllergens));
    this.orderItems$ = this.store.pipe(select(selectOrderItems));
    this.selectedItem$ = this.store.pipe(select(selectSelectedItem));
    this.currentLanguage$ = this.store.pipe(select(selectLanguage));
    this.currentRestaurant$ = this.store.pipe(select(selectRestaurant));
    this.hiddenItems$ = this.store.pipe(select(selectHiddenItems));
    this.validatedPasswords$ = this.store.pipe(
      select(selectValidatedPasswords)
    );

    combineLatest([this.currentRestaurant$, this.currentLanguage$])
      .pipe(filter(([restaurant]) => !!restaurant))
      .subscribe(([restaurant, language]) => {
        this.file = require('../../assets/restaurants/' + restaurant + '.json');
        this.menu.next(this.mapMenuByLanguage(language));
        this.restaurantData.next(this.mapRestaurantDataByLanguage(language));
      });
  }

  public getAllergensFromName(allergenNames: string[]): Allergen[] {
    return allergenNames.map((allergenName) => {
      return (
        allergenList.find((allergen) => {
          return allergen.name === allergenName;
        }) ?? { name: '', icon: '', color: '' }
      );
    });
  }

  private mapRestaurantDataByLanguage(language: Language) {
    return {
      ...this.file.data,
      description: this.file.data.description[language],
    };
  }

  private mapMenuByLanguage(lang: Language): mappedCategory[] {
    return this.file.menu.map((category: Category) => {
      return {
        category: category.category[lang],
        items: category.items.map((item: Item) => {
          return {
            ...item,
            title: item.title[lang],
            description: item.description[lang],
          };
        }),
      };
    });
  }

  public filterItemsFromMenu(
    menu: mappedCategory[]
  ): Observable<mappedCategory[]> {
    return combineLatest([
      this.allergens$,
      this.hiddenItems$,
      this.validatedPasswords$,
    ]).pipe(
      map(([allergens, hiddenItems, validatedPasswords]) => {
        return menu.map((category: mappedCategory) => {
          return {
            ...category,
            items: this.applyFilters(
              { allergens, hiddenItems, validatedPasswords },
              category.items
            ),
          };
        });
      })
    );
  }

  private applyFilters(
    filters: {
      allergens: string[];
      hiddenItems: number[];
      validatedPasswords: string[];
    },
    items: mappedItem[]
  ): mappedItem[] {
    return items.filter(
      (item: mappedItem) =>
        this.filterAlergens(item, filters.allergens) &&
        this.filterPreferences(item, filters.allergens) &&
        this.filterHiddenItems(item, filters.hiddenItems) &&
        this.filterSecretItems(item, filters.validatedPasswords)
    );
  }

  private filterAlergens(item: mappedItem, allergens: string[]) {
    return item.allergens.every(
      (allergen) =>
        !allergens
          .filter((allergen) => !['vegetarian', 'vegan'].includes(allergen))
          .includes(allergen)
    );
  }

  private filterPreferences(item: mappedItem, allergens: string[]) {
    return allergens
      .filter((allergen) => ['vegetarian', 'vegan'].includes(allergen))
      .every((allergen) => item.allergens.includes(allergen));
  }

  private filterHiddenItems(item: mappedItem, hiddenItems: number[]) {
    return !hiddenItems.includes(item.itemId);
  }

  private filterSecretItems(item: mappedItem, validatedPasswords: string[]) {
    return !validatedPasswords.includes('secretItems') ? !item.secret : true;
  }

  public getSelectedItem(): Observable<mappedItem> {
    return combineLatest([this.selectedItem$, this.menu]).pipe(
      map(([selectedItem, menu]) => {
        return this.findSelectedItem(selectedItem, menu);
      })
    );
  }

  private findSelectedItem(
    selectedItem: number,
    menu: mappedCategory[]
  ): mappedItem {
    let foundItem: mappedItem = {
      itemId: 0,
      title: '',
      price: 0,
      description: '',
      allergens: [],
      pictures: [],
      secret: false,
    };
    menu.forEach((category: mappedCategory) => {
      category.items.forEach((item: mappedItem) => {
        if (item.itemId === selectedItem) foundItem = item;
      });
    });
    return foundItem;
  }

  public getOrderItems(): Observable<(mappedItem & OrderItem)[]> {
    return combineLatest([this.orderItems$, this.menu]).pipe(
      map(([orderItems, menu]) => {
        return orderItems.map((orderItem) => {
          return {
            ...this.findSelectedItem(orderItem.itemId, menu),
            ...orderItem,
          };
        });
      })
    );
  }

  public calculateTotal(): Observable<number> {
    return this.getOrderItems().pipe(
      map((orderItems: mappedItem[]) =>
        orderItems.reduce((acc, orderItem) => acc + orderItem.price, 0)
      )
    );
  }
}
