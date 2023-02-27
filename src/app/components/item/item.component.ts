import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectShowAllergens } from '@store/app.selectors';
import { FoodService } from '@services/food.service';
import type { mappedItem } from '@interfaces/item.interface';
import type { Allergen } from '@interfaces/allergen.interface';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: mappedItem;
  showAllergens$: Observable<boolean>;
  allergens: Allergen[];

  constructor(
    private store: Store<{ state: AppState }>,
    private foodService: FoodService
  ) {
    this.showAllergens$ = this.store.pipe(select(selectShowAllergens));
    this.item = {
      itemId: 0,
      title: '',
      price: 0,
      description: '',
      allergens: [],
      pictures: [],
      secret: false,
    };
    this.allergens = [];
  }
  public ngOnInit() {
    this.allergens = this.foodService.getAllergensFromName(this.item.allergens);
  }
}
