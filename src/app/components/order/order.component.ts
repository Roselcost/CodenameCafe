import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodService } from '@services/food.service';
import { StringService } from '@services/string.service';
import { clearOrder, removeItem, setCurrentOpenDialog } from '@store/app.actions';
import type { AppState } from '@interfaces/appState.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  orderItems$: Observable<any[]>;
  total$: Observable<number>;
  strings;
  edit: boolean;

  constructor(
    private store: Store<{ state: AppState }>,
    private foodService: FoodService,
    private stringService: StringService
  ) {
    this.orderItems$ = this.foodService.getOrderItems();
    this.total$ = this.foodService.calculateTotal();
    this.strings = this.stringService.strings;
    this.edit = false;
  }

  public confirm() {
    this.store.dispatch(clearOrder());
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }

  public removeItem(id: number) {
    this.store.dispatch(removeItem({ orderId: id }));
  }
}
