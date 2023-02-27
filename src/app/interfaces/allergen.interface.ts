export interface Allergen {
  name: string;
  icon: string;
  color: string;
}

export const allergenList: Allergen[] = [
  { name: 'egg', icon: '🥚', color: '#808080' },
  { name: 'lactose', icon: '🥛', color: '#f6f5f1' },
  { name: 'crustaceans', icon: '🦐', color: '#cd331b' },
  { name: 'gluten', icon: '🌾', color: '#d6891c' },
  { name: 'peanuts', icon: '🥜', color: '#d4af95' },
  { name: 'molluscs', icon: '🦪', color: '#afe6ff' },
  { name: 'fructose', icon: '🍅', color: '#a65151' },
  { name: 'soy', icon: '🌿', color: '#6f996e' },
  { name: 'vegetarian', icon: '🍯', color: '#6f996e' },
  { name: 'vegan', icon: '🌱', color: '#6f996e' },
];
