import type { Item, mappedItem } from './item.interface';
import type { Languages } from './language.enum';

export interface Category {
  category: Languages;
  items: Item[];
}

export interface mappedCategory {
  category: string;
  items: mappedItem[];
}
