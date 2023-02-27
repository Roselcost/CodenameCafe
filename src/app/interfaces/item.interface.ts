import type { Languages } from './language.enum';

export interface Item {
  itemId: number;
  title: Languages;
  price: number;
  description: Languages;
  allergens: string[];
  pictures: string[];
  secret: boolean;
}

export interface mappedItem {
  itemId: number;
  title: string;
  price: number;
  description: string;
  allergens: string[];
  pictures: string[];
  secret: boolean;
}
