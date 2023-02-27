import { Component, OnInit } from '@angular/core';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FoodService } from '@services/food.service';
import { StringService } from '@services/string.service';
import { selectCurrentOpenDialog } from '@store/app.selectors';
import { setCurrentOpenDialog, setItem } from '@store/app.actions';
import type { AppState } from '@interfaces/appState.interface';
import type { mappedCategory } from '@interfaces/category.interface';

const inOutAnimation = animation([
  style({ opacity: 1 }),
  animate('0.2s ease-out', style({ opacity: 0 })),
]);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':leave', [useAnimation(inOutAnimation)]),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  currentOpenDialog$: Observable<string>;
  menu$: Observable<mappedCategory[]>;
  isSelectionFiltered: BehaviorSubject<boolean> = new BehaviorSubject(false);
  strings;

  constructor(
    private store: Store<{ state: AppState }>,
    private foodService: FoodService,
    private stringService: StringService
  ) {
    this.currentOpenDialog$ = this.store.pipe(select(selectCurrentOpenDialog));
    this.menu$ = this.foodService.menu.pipe(
      switchMap((menu) => this.foodService.filterItemsFromMenu(menu))
    );
    this.strings = this.stringService.strings;
  }

  public ngOnInit() {
    // this.store.dispatch(setCurrentOpenDialog({ dialog: 'about' }));
  }

  public selectItem(itemId: number) {
    this.store.dispatch(setItem({ itemId }));
    this.store.dispatch(setCurrentOpenDialog({ dialog: 'selectedItem' }));
  }

  public closeWindow() {
    this.store.dispatch(setCurrentOpenDialog({ dialog: '' }));
  }
}
