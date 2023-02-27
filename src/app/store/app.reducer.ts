import { createReducer, on } from '@ngrx/store';
import {
  addItem,
  setCurrentOpenDialog,
  setAllergen,
  setItem,
  setShowAllergens,
  setLanguage,
  startOver,
  removeItem,
  setTheme,
  setRestaurant,
  hideItem,
  restoreHiddenItems,
  validatePassword,
  clearOrder,
} from '@store/app.actions';
import { Language } from '@interfaces/language.enum';
import type { OrderItem } from '@interfaces/orderItem.interface';
import type { AppState } from '@interfaces/appState.interface';

const initialStateFile = require('../../assets/defaults/initialState.json');

export const initialState: AppState = initialStateFile ?? {
  orderItems: [],
  hiddenItems: [],
  selectedItem: 0,
  allergens: [],
  currentOpenDialog: '',
  showAllergens: true,
  language: Language.en,
  theme: 'dark-theme',
  restaurant: '',
  validatedPasswords: [],
};

function addToOrder(state: AppState, items: OrderItem[]) {
  let maxId = state.orderItems.reduce((acum, orderItem) => {
    return Math.max(orderItem.orderId, acum);
  }, 0);
  items = items.map((item, index) => {
    return { ...item, orderId: maxId + index + 1 };
  });
  return state.orderItems.concat(items);
}

export const mainReducer = createReducer(
  initialState,
  on(addItem, (state, { items }) => {
    return {
      ...state,
      orderItems: addToOrder(state, items),
    };
  }),
  on(setItem, (state, { itemId }) => {
    return {
      ...state,
      selectedItem: itemId,
    };
  }),
  on(setAllergen, (state, { allergen }) => {
    return {
      ...state,
      allergens: state.allergens.includes(allergen)
        ? state.allergens.filter((allergenName) => allergenName !== allergen)
        : state.allergens.concat([allergen]),
    };
  }),
  on(setCurrentOpenDialog, (state, { dialog }) => {
    return {
      ...state,
      currentOpenDialog: dialog === state.currentOpenDialog ? '' : dialog,
    };
  }),
  on(setShowAllergens, (state, { show }) => {
    return {
      ...state,
      showAllergens: show,
    };
  }),
  on(setLanguage, (state, { language }) => {
    return {
      ...state,
      language,
    };
  }),
  on(removeItem, (state, { orderId }) => {
    return {
      ...state,
      orderItems: state.orderItems.filter((item) => item.orderId !== orderId),
    };
  }),
  on(setTheme, (state, { theme }) => {
    return {
      ...state,
      theme,
    };
  }),
  on(hideItem, (state, { itemId }) => {
    return {
      ...state,
      hiddenItems: !state.hiddenItems.includes(itemId)
        ? state.hiddenItems.concat([itemId])
        : state.hiddenItems,
    };
  }),
  on(restoreHiddenItems, (state) => {
    return {
      ...state,
      hiddenItems: [],
    };
  }),
  on(setRestaurant, (state, { restaurant }) => {
    return {
      ...state,
      restaurant,
    };
  }),
  on(validatePassword, (state, { passwordType }) => {
    return {
      ...state,
      validatedPasswords: !state.validatedPasswords.includes(passwordType)
        ? state.validatedPasswords.concat([passwordType])
        : state.validatedPasswords,
    };
  }),
  on(clearOrder, (state) => {
    return {
      ...state,
      orderItems: [],
    };
  }),

  on(startOver, (state) => {
    return {
      ...initialState,
      language: state.language,
      restaurant: state.restaurant,
      theme: state.theme,
      currentOpenDialog: state.currentOpenDialog,
    };
  })
);
