import { createSelector } from '@ngrx/store';
import type { AppState } from '@interfaces/appState.interface';

export const selectOrderItems = createSelector(
  (state: { state: AppState }) => state.state.orderItems,
  (state) => state
);

export const selectSelectedItem = createSelector(
  (state: { state: AppState }) => state.state.selectedItem,
  (state) => state
);

export const selectAllergens = createSelector(
  (state: { state: AppState }) => state.state.allergens,
  (state) => state
);

export const selectCurrentOpenDialog = createSelector(
  (state: { state: AppState }) => state.state.currentOpenDialog,
  (state) => state
);

export const selectShowAllergens = createSelector(
  (state: { state: AppState }) => state.state.showAllergens,
  (state) => state
);

export const selectLanguage = createSelector(
  (state: { state: AppState }) => state.state.language,
  (state) => state
);

export const selectTheme = createSelector(
  (state: { state: AppState }) => state.state.theme,
  (state) => state
);
export const selectRestaurant = createSelector(
  (state: { state: AppState }) => state.state.restaurant,
  (state) => state
);
export const selectValidatedPasswords = createSelector(
  (state: { state: AppState }) => state.state.validatedPasswords,
  (state) => state
);
export const selectHiddenItems = createSelector(
  (state: { state: AppState }) => state.state.hiddenItems,
  (state) => state
);
