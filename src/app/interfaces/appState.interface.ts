import type { Language } from './language.enum';
import type { OrderItem } from './orderItem.interface';

export interface AppState {
  orderItems: OrderItem[];
  hiddenItems: number[];
  selectedItem: number;
  allergens: string[];
  currentOpenDialog: string;
  showAllergens: boolean;
  language: Language;
  theme: string;
  restaurant: string;
  validatedPasswords: string[];
}
