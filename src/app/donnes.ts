// --- INTERFACES ---
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  quantity?: number;
  unit?: string;
  time: string;
}

export interface DatabaseItem {
  name: string;
  calories: number;
  standardAmount: number;
  unit: string;
  isCustom?: boolean;
  icon?: string;
}

export interface UserAccount {
  username: string;
  password?: string;
  name: string;
}

export interface Ingredient {
  name: string;
  calories: number;
}

// --- BASE DE DONNÉES ---
export const FOOD_DATABASE: DatabaseItem[] = [
  { name: 'Abricot', calories: 48, standardAmount: 100, unit: 'g', icon: '🍑' },
  { name: 'Amandes', calories: 575, standardAmount: 100, unit: 'g', icon: '🌰' },
  { name: 'Ananas', calories: 50, standardAmount: 100, unit: 'g', icon: '🍍' },
  { name: 'Avocat', calories: 160, standardAmount: 100, unit: 'g', icon: '🥑' },
  { name: 'Barre chocolatée', calories: 250, standardAmount: 1, unit: 'barre', icon: '🍫' },
  { name: 'Banane', calories: 89, standardAmount: 1, unit: 'pièce', icon: '🍌' },
  { name: 'Beurre', calories: 717, standardAmount: 100, unit: 'g', icon: '🧈' },
  { name: 'Biscuit sablé', calories: 480, standardAmount: 100, unit: 'g', icon: '🍪' },
  { name: 'Boeuf grillé', calories: 250, standardAmount: 100, unit: 'g', icon: '🥩' },
  { name: 'Boulgour cuit', calories: 83, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Boulgour cru', calories: 342, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Cabillaud', calories: 82, standardAmount: 100, unit: 'g', icon: '🐟' },
  { name: 'Cerise', calories: 63, standardAmount: 100, unit: 'g', icon: '🍒' },
  { name: 'Chips', calories: 536, standardAmount: 100, unit: 'g', icon: '🍟' },
  { name: 'Chocolat au lait', calories: 535, standardAmount: 100, unit: 'g', icon: '🍫' },
  { name: 'Chocolat noir', calories: 546, standardAmount: 100, unit: 'g', icon: '🍫' },
  { name: 'Clémentine', calories: 47, standardAmount: 1, unit: 'pièce', icon: '🍊' },
  { name: 'Café', calories: 2, standardAmount: 1, unit: 'tasse', icon: '☕' },
  { name: 'Café sucré', calories: 30, standardAmount: 1, unit: 'tasse', icon: '☕' },
  { name: 'Croissant', calories: 406, standardAmount: 1, unit: 'pièce', icon: '🥐' },
  { name: 'Crevettes ', calories: 99, standardAmount: 100, unit: 'g', icon: '🍤' },
  { name: 'Dinde (cuit)', calories: 135, standardAmount: 100, unit: 'g', icon: '🦃' },
  { name: 'Eau', calories: 0, standardAmount: 250, unit: 'ml', icon: '💧' },
  { name: 'Flocons avoine', calories: 350, standardAmount: 100, unit: 'g', icon: '🌾' },
  { name: 'Figues', calories: 74, standardAmount: 100, unit: 'g', icon: '🍈' },
  { name: 'Fraise', calories: 32, standardAmount: 100, unit: 'g', icon: '🍓' },
  { name: 'Haricots rouges cuits', calories: 127, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Haricots rouges crus', calories: 330, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Jus d’orange', calories: 45, standardAmount: 100, unit: 'ml', icon: '🍹' },
  { name: 'Kiwi', calories: 61, standardAmount: 1, unit: 'pièce', icon: '🥝' },
  { name: 'Ketchup', calories: 112, standardAmount: 100, unit: 'g', icon: '🍅' },
  { name: 'Lait demi-écrémé', calories: 47, standardAmount: 100, unit: 'ml', icon: '🥛' },
  { name: 'Lait entier', calories: 65, standardAmount: 100, unit: 'ml', icon: '🥛' },
  { name: 'Lentilles cuites', calories: 116, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Lentilles crues', calories: 352, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Mangue', calories: 60, standardAmount: 100, unit: 'g', icon: '🥭' },
  { name: 'Mayonnaise', calories: 680, standardAmount: 100, unit: 'g', icon: '🥫' },
  { name: 'Melon', calories: 34, standardAmount: 100, unit: 'g', icon: '🍈' },
  { name: 'Merguez', calories: 270, standardAmount: 1, unit: 'pièce', icon: '🌭' },
  { name: 'Mozzarella', calories: 280, standardAmount: 100, unit: 'g', icon: '🧀' },
  { name: 'Moutarde', calories: 66, standardAmount: 100, unit: 'g', icon: '🥫' },
  { name: 'Noix de cajou', calories: 553, standardAmount: 100, unit: 'g', icon: '🥜' },
  { name: 'Orange', calories: 62, standardAmount: 1, unit: 'pièce', icon: '🍊' },
  { name: 'Papaye', calories: 43, standardAmount: 100, unit: 'g', icon: '🫐' },
  { name: 'Pain', calories: 265, standardAmount: 100, unit: 'g', icon: '🍞' },
  { name: 'Pain au chocolat', calories: 448, standardAmount: 1, unit: 'pièce', icon: '🥐' },
  { name: 'Pain complet', calories: 247, standardAmount: 100, unit: 'g', icon: '🍞' },
  { name: 'Pain de mie', calories: 250, standardAmount: 100, unit: 'g', icon: '🍞' },
  { name: 'Pain libanais', calories: 275, standardAmount: 100, unit: 'g', icon: '🥖' },
  { name: 'Pastèque', calories: 30, standardAmount: 100, unit: 'g', icon: '🍉' },
  { name: 'Pâtes cuites', calories: 131, standardAmount: 100, unit: 'g', icon: '🍝' },
  { name: 'Pâtes crues', calories: 371, standardAmount: 100, unit: 'g', icon: '🍝' },
  { name: 'Perly Bleu', calories: 80, standardAmount: 1, unit: 'pot', icon: '🧀' },
  { name: 'Pois chiches cuits', calories: 164, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Pois chiches crus', calories: 378, standardAmount: 100, unit: 'g', icon: '🫘' },
  { name: 'Pommes de terre (cuites)', calories: 87, standardAmount: 100, unit: 'g', icon: '🥔' },
  { name: 'Pomme', calories: 52, standardAmount: 100, unit: 'g', icon: '🍎' },
  { name: 'Poire', calories: 57, standardAmount: 1, unit: 'pièce', icon: '🍐' },
  { name: 'Poulet (cuit)', calories: 165, standardAmount: 100, unit: 'g', icon: '🍗' },
  { name: 'Prune', calories: 46, standardAmount: 100, unit: 'g', icon: '🍑' },
  { name: 'Quinoa cuit', calories: 120, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Quinoa cru', calories: 368, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Raisin', calories: 69, standardAmount: 100, unit: 'g', icon: '🍇' },
  { name: 'Riz cuit', calories: 130, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Riz cru', calories: 365, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Sauce barbecue', calories: 150, standardAmount: 100, unit: 'g', icon: '🥫' },
  { name: 'Sardines', calories: 208, standardAmount: 100, unit: 'g', icon: '🐟' },
  { name: 'Saumon', calories: 208, standardAmount: 100, unit: 'g', icon: '🐟' },
  { name: 'Semoule cuite', calories: 112, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Semoule crue', calories: 376, standardAmount: 100, unit: 'g', icon: '🍚' },
  { name: 'Soda', calories: 140, standardAmount: 330, unit: 'ml', icon: '🥤' },
  { name: 'Thé', calories: 2, standardAmount: 1, unit: 'tasse', icon: '🍵' },
  { name: 'Thon en boîte', calories: 116, standardAmount: 100, unit: 'g', icon: '🐟' },
  { name: 'Viande hachée', calories: 250, standardAmount: 100, unit: 'g', icon: '🥩' },
  { name: 'Yaourt nature', calories: 59, standardAmount: 1, unit: 'pot', icon: '🥛' },
  { name: 'Huile', calories: 120, standardAmount: 1, unit: 'c.à.s', icon: '🫗' },
  { name: 'Oeuf', calories: 72, standardAmount: 1, unit: 'pièce', icon: '🥚' }
];

