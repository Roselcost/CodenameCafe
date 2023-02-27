import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { StringService } from '@services/string.service';
import { FoodService } from '@services/food.service';
import { setCurrentOpenDialog } from '@store/app.actions';
import { selectCurrentOpenDialog } from '@store/app.selectors';
import type { RestaurantData } from '@interfaces/restaurantData.interface';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentOpenDialog$: Observable<string>;
  restaurantData$: Observable<RestaurantData>;
  strings;
  constructor(
    private store: Store<{ state: AppState }>,
    private stringService: StringService,
    private foodService: FoodService
  ) {
    this.currentOpenDialog$ = this.store.pipe(select(selectCurrentOpenDialog));
    this.restaurantData$ = this.foodService.restaurantData;
    this.strings = this.stringService.strings;
  }

  public openDialog(dialog: string) {
    this.store.dispatch(setCurrentOpenDialog({ dialog }));
  }
}
