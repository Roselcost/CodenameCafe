import type { Languages } from './language.enum';

export interface RestaurantData {
  id: string;
  name: string;
  description: Languages;
  icon: string;
  passwords: { pass: string; type: string }[];
}
