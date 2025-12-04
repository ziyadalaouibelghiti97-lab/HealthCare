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
  // =========================================
  // 🌿 FRUITS (crus)
  // =========================================
  { name: 'Pomme', calories: 52, standardAmount: 1, unit: 'pièce' },
  { name: 'Pomme (crue)', calories: 52, standardAmount: 100, unit: 'g' },
  { name: 'Banane', calories: 89, standardAmount: 1, unit: 'pièce' },
  { name: 'Banane (crue)', calories: 89, standardAmount: 100, unit: 'g' },
  { name: 'Orange', calories: 62, standardAmount: 1, unit: 'pièce' },
  { name: 'Orange (crue)', calories: 47, standardAmount: 100, unit: 'g' },
  { name: 'Clémentine', calories: 47, standardAmount: 1, unit: 'pièce' },
  { name: 'Pêche', calories: 39, standardAmount: 1, unit: 'pièce' },
  { name: 'Poire', calories: 57, standardAmount: 1, unit: 'pièce' },
  { name: 'Fraise', calories: 32, standardAmount: 100, unit: 'g' },
  { name: 'Cerise', calories: 63, standardAmount: 100, unit: 'g' },
  { name: 'Mangue', calories: 60, standardAmount: 100, unit: 'g' },
  { name: 'Papaye', calories: 43, standardAmount: 100, unit: 'g' },
  { name: 'Pastèque', calories: 30, standardAmount: 100, unit: 'g' },
  { name: 'Melon', calories: 34, standardAmount: 100, unit: 'g' },
  { name: 'Kiwi', calories: 61, standardAmount: 1, unit: 'pièce' },
  { name: 'Raisin', calories: 69, standardAmount: 100, unit: 'g' },
  { name: 'Ananas', calories: 50, standardAmount: 100, unit: 'g' },
  { name: 'Abricot', calories: 48, standardAmount: 100, unit: 'g' },
  { name: 'Prune', calories: 46, standardAmount: 100, unit: 'g' },
  { name: 'Figues', calories: 74, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🥕 LÉGUMES CRUS
  // =========================================
  { name: 'Carotte (crue)', calories: 41, standardAmount: 100, unit: 'g' },
  { name: 'Tomate (crue)', calories: 18, standardAmount: 100, unit: 'g' },
  { name: 'Concombre (cru)', calories: 15, standardAmount: 100, unit: 'g' },
  { name: 'Poivron (cru)', calories: 31, standardAmount: 100, unit: 'g' },
  { name: 'Brocoli (cru)', calories: 34, standardAmount: 100, unit: 'g' },
  { name: 'Chou-fleur (cru)', calories: 25, standardAmount: 100, unit: 'g' },
  { name: 'Oignon (cru)', calories: 40, standardAmount: 100, unit: 'g' },
  { name: 'Épinards (crus)', calories: 23, standardAmount: 100, unit: 'g' },
  { name: 'Betterave (crue)', calories: 43, standardAmount: 100, unit: 'g' },
  { name: 'Salade verte', calories: 15, standardAmount: 100, unit: 'g' },
  { name: 'Laitue (crue)', calories: 14, standardAmount: 100, unit: 'g' },
  { name: 'Radis (cru)', calories: 16, standardAmount: 100, unit: 'g' },
  { name: 'Aubergine (crue)', calories: 25, standardAmount: 100, unit: 'g' },
  { name: 'Courgette (crue)', calories: 17, standardAmount: 100, unit: 'g' },
  { name: 'Haricots verts (crus)', calories: 31, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🥦 LÉGUMES CUITS
  // =========================================
  { name: 'Brocoli (cuit)', calories: 35, standardAmount: 100, unit: 'g' },
  { name: 'Carotte (cuite)', calories: 35, standardAmount: 100, unit: 'g' },
  { name: 'Courgette (cuite)', calories: 20, standardAmount: 100, unit: 'g' },
  { name: 'Chou-fleur (cuit)', calories: 23, standardAmount: 100, unit: 'g' },
  { name: 'Haricots verts (cuits)', calories: 35, standardAmount: 100, unit: 'g' },
  { name: 'Petits pois (cuits)', calories: 81, standardAmount: 100, unit: 'g' },
  { name: 'Épinards (cuits)', calories: 40, standardAmount: 100, unit: 'g' },
  { name: 'Pommes de terre (cuites)', calories: 87, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🍞 FÉCULENTS / CÉRÉALES cuits + crus
  // =========================================
  { name: 'Riz cru', calories: 365, standardAmount: 100, unit: 'g' },
  { name: 'Riz cuit', calories: 130, standardAmount: 100, unit: 'g' },
  { name: 'Pâtes crues', calories: 371, standardAmount: 100, unit: 'g' },
  { name: 'Pâtes cuites', calories: 131, standardAmount: 100, unit: 'g' },
  { name: 'Quinoa cru', calories: 368, standardAmount: 100, unit: 'g' },
  { name: 'Quinoa cuit', calories: 120, standardAmount: 100, unit: 'g' },
  { name: 'Boulgour cru', calories: 342, standardAmount: 100, unit: 'g' },
  { name: 'Boulgour cuit', calories: 83, standardAmount: 100, unit: 'g' },
  { name: 'Semoule crue', calories: 376, standardAmount: 100, unit: 'g' },
  { name: 'Semoule cuite', calories: 112, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🍗 VIANDES CRUES
  // =========================================
  { name: 'Poulet (cru)', calories: 120, standardAmount: 100, unit: 'g' },
  { name: 'Dinde (crue)', calories: 114, standardAmount: 100, unit: 'g' },
  { name: 'Boeuf (cru)', calories: 250, standardAmount: 100, unit: 'g' },
  { name: 'Agneau (cru)', calories: 294, standardAmount: 100, unit: 'g' },
  { name: 'Veau (cru)', calories: 195, standardAmount: 100, unit: 'g' },
  { name: 'Steak haché (cru 5%)', calories: 155, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🍗 VIANDES CUITES
  // =========================================
  { name: 'Poulet (cuit)', calories: 165, standardAmount: 100, unit: 'g' },
  { name: 'Dinde (cuit)', calories: 135, standardAmount: 100, unit: 'g' },
  { name: 'Boeuf grillé', calories: 250, standardAmount: 100, unit: 'g' },
  { name: 'Merguez', calories: 270, standardAmount: 1, unit: 'pièce' },
  { name: 'Escalope panée', calories: 275, standardAmount: 100, unit: 'g' },
  { name: 'Saucisse de volaille', calories: 180, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🐟 POISSONS CRUS + FRUITS DE MER
  // =========================================
  { name: 'Saumon (cru)', calories: 208, standardAmount: 100, unit: 'g' },
  { name: 'Saumon (cuit)', calories: 230, standardAmount: 100, unit: 'g' },
  { name: 'Thon (cru)', calories: 144, standardAmount: 100, unit: 'g' },
  { name: 'Thon en boîte', calories: 116, standardAmount: 100, unit: 'g' },
  { name: 'Cabillaud (cru)', calories: 82, standardAmount: 100, unit: 'g' },
  { name: 'Crevettes (cuites)', calories: 99, standardAmount: 100, unit: 'g' },
  { name: 'Sardines', calories: 208, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🧀 PRODUITS LAITIERS
  // =========================================
  { name: 'Lait demi-écrémé', calories: 47, standardAmount: 100, unit: 'ml' },
  { name: 'Lait entier', calories: 65, standardAmount: 100, unit: 'ml' },
  { name: 'Yaourt nature', calories: 59, standardAmount: 1, unit: 'pot' },
  { name: 'Fromage blanc', calories: 62, standardAmount: 100, unit: 'g' },
  { name: 'Mozzarella', calories: 280, standardAmount: 100, unit: 'g' },
  { name: 'Cheddar', calories: 402, standardAmount: 100, unit: 'g' },
  { name: 'Beurre', calories: 717, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🌰 LÉGUMINEUSES (crues + cuites)
  // =========================================
  { name: 'Lentilles crues', calories: 352, standardAmount: 100, unit: 'g' },
  { name: 'Lentilles cuites', calories: 116, standardAmount: 100, unit: 'g' },
  { name: 'Pois chiches crus', calories: 378, standardAmount: 100, unit: 'g' },
  { name: 'Pois chiches cuits', calories: 164, standardAmount: 100, unit: 'g' },
  { name: 'Haricots rouges crus', calories: 330, standardAmount: 100, unit: 'g' },
  { name: 'Haricots rouges cuits', calories: 127, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🍞 PAIN / VIENNOISERIES
  // =========================================
  { name: 'Pain', calories: 265, standardAmount: 100, unit: 'g' },
  { name: 'Pain complet', calories: 247, standardAmount: 100, unit: 'g' },
  { name: 'Pain de mie', calories: 250, standardAmount: 100, unit: 'g' },
  { name: 'Croissant', calories: 406, standardAmount: 1, unit: 'pièce' },
  { name: 'Pain au chocolat', calories: 448, standardAmount: 1, unit: 'pièce' },

  // =========================================
  // 🍔 PLATS CUISINÉS
  // =========================================
  { name: 'Pizza margherita', calories: 266, standardAmount: 100, unit: 'g' },
  { name: 'Pizza 4 fromages', calories: 310, standardAmount: 100, unit: 'g' },
  { name: 'Lasagnes', calories: 135, standardAmount: 100, unit: 'g' },
  { name: 'Couscous', calories: 170, standardAmount: 100, unit: 'g' },
  { name: 'Tajine poulet citron', calories: 120, standardAmount: 100, unit: 'g' },
  { name: 'Hamburger simple', calories: 295, standardAmount: 1, unit: 'pièce' },

  // =========================================
  // 🍰 DESSERTS
  // =========================================
  { name: 'Glace vanille', calories: 207, standardAmount: 100, unit: 'g' },
  { name: 'Crêpe nature', calories: 112, standardAmount: 1, unit: 'pièce' },
  { name: 'Gâteau au chocolat', calories: 430, standardAmount: 100, unit: 'g' },
  { name: 'Beignet', calories: 450, standardAmount: 1, unit: 'pièce' },
  { name: 'Flan pâtissier', calories: 150, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🧂 SAUCES
  // =========================================
  { name: 'Mayonnaise', calories: 680, standardAmount: 100, unit: 'g' },
  { name: 'Ketchup', calories: 112, standardAmount: 100, unit: 'g' },
  { name: 'Moutarde', calories: 66, standardAmount: 100, unit: 'g' },
  { name: 'Sauce barbecue', calories: 150, standardAmount: 100, unit: 'g' },

  // =========================================
  // 🧃 BOISSONS
  // =========================================
  { name: 'Eau', calories: 0, standardAmount: 250, unit: 'ml' },
  { name: 'Soda', calories: 140, standardAmount: 330, unit: 'ml' },
  { name: 'Jus d’orange', calories: 45, standardAmount: 100, unit: 'ml' },
  { name: 'Thé', calories: 2, standardAmount: 1, unit: 'tasse' },
  { name: 'Café', calories: 2, standardAmount: 1, unit: 'tasse' },
  { name: 'Café sucré', calories: 30, standardAmount: 1, unit: 'tasse' },

  // =========================================
  // 🍫 SNACKS
  // =========================================
  { name: 'Chips', calories: 536, standardAmount: 100, unit: 'g' },
  { name: 'Chocolat noir', calories: 546, standardAmount: 100, unit: 'g' },
  { name: 'Chocolat au lait', calories: 535, standardAmount: 100, unit: 'g' },
  { name: 'Barre chocolatée', calories: 250, standardAmount: 1, unit: 'barre' },
  { name: 'Biscuit sablé', calories: 480, standardAmount: 100, unit: 'g' },
  { name: 'Amandes', calories: 575, standardAmount: 100, unit: 'g' },
  { name: 'Noix de cajou', calories: 553, standardAmount: 100, unit: 'g' },
];
