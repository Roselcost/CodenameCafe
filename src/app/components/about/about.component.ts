import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from '@services/food.service';
import { StringService } from '@services/string.service';
import { Store } from '@ngrx/store';
import { setRestaurant, startOver } from '@store/app.actions';
import type { AppState } from '@interfaces/appState.interface';
import type { RestaurantData } from '@interfaces/restaurantData.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  strings;
  restaurantList = require('../../../assets/restaurants/list.json');
  restaurantData$: Observable<RestaurantData>;
  constructor(
    private store: Store<AppState>,
    private stringService: StringService,
    private foodService: FoodService
  ) {
    this.strings = this.stringService.strings;
    this.restaurantData$ = this.foodService.restaurantData;
  }

  public selectRestaurant(restaurant: string) {
    try {
      require('../../../assets/restaurants/' + restaurant + '.json');
      this.store.dispatch(setRestaurant({ restaurant }));
      this.store.dispatch(startOver());
    } catch (err) {
      throw new Error('File not available');
    }
  }
}
