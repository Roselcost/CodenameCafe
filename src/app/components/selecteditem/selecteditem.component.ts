import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodService } from '@services/food.service';
import { StringService } from '@services/string.service';
import { addItem, setCurrentOpenDialog, hideItem } from '@store/app.actions';
import type { mappedItem } from '@interfaces/item.interface';
import type { OrderItem } from '@interfaces/orderItem.interface';
import type { Allergen } from '@interfaces/allergen.interface';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-selecteditem',
  templateUrl: './selecteditem.component.html',
  styleUrls: ['./selecteditem.component.scss'],
})
export class SelecteditemComponent {
  selectedItem$: Observable<mappedItem>;
  itemId: number;
  number: number;
  excludedIngredients: [];
  comments: string;
  strings;
  allergens: Allergen[];

  constructor(
    private store: Store<{ state: AppState }>,
    private foodService: FoodService,
    private stringService: StringService
  ) {
    this.selectedItem$ = this.foodService.getSelectedItem();
    this.itemId = 0;
    this.number = 1;
    this.excludedIngredients = [];
    this.comments = '';
    this.strings = this.stringService.strings;
    this.allergens = [];
    this.selectedItem$.subscribe((selectedItem) => {
      this.itemId = selectedItem.itemId;
      this.allergens = this.foodService.getAllergensFromName(
        selectedItem.allergens
      );
    });
  }

  public add(sum: 1 | -1) {
    let res = this.number + sum;
    if (res < 1 || res > 20) return;
    this.number = res;
  }

  public addItem() {
    this.store.dispatch(addItem({ items: this.processItems() }));
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }

  public hideItem() {
    this.store.dispatch(hideItem({ itemId: this.itemId }));
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }

  private processItems(): OrderItem[] {
    let itemList = [];
    for (let i = this.number; i > 0; --i) {
      itemList.push({
        orderId: 0,
        itemId: this.itemId,
        excludedIngredients: this.excludedIngredients,
        comments: this.comments,
      });
    }
    return itemList;
  }
}
