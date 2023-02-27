import { createAction, props } from '@ngrx/store';
import type { Language } from '@interfaces/language.enum';
import type { OrderItem } from '@interfaces/orderItem.interface';

export const addItem = createAction(
  '[General] Add Item',
  props<{ items: OrderItem[] }>()
);
export const setItem = createAction(
  '[General] Set Item',
  props<{ itemId: number }>()
);
export const setAllergen = createAction(
  '[General] Set Allergen',
  props<{ allergen: string }>()
);
export const setCurrentOpenDialog = createAction(
  '[General] Set Current Open Dialog',
  props<{ dialog: string }>()
);
export const setShowAllergens = createAction(
  '[General] Set Show Allergens',
  props<{ show: boolean }>()
);
export const setLanguage = createAction(
  '[General] Set Language',
  props<{ language: Language }>()
);
export const removeItem = createAction(
  '[General] Remove Item',
  props<{ orderId: number }>()
);
export const setTheme = createAction(
  '[General] Set Theme',
  props<{ theme: string }>()
);
export const setRestaurant = createAction(
  '[General] Set Restaurant',
  props<{ restaurant: string }>()
);
export const hideItem = createAction(
  '[General] Hide Item',
  props<{ itemId: number }>()
);
export const validatePassword = createAction(
  '[General] Validate Password',
  props<{ passwordType: string }>()
);
export const restoreHiddenItems = createAction(
  '[General] Restore Hidden Items'
);
export const clearOrder = createAction('[General] Clear Order');
export const startOver = createAction('[General] Start Over');
