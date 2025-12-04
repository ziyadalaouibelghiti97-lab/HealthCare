import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Stats } from './stats/stats';
import { Food } from './food/food';
import { Journal } from './journal/journal';
import { DatabaseItem, FoodItem, FOOD_DATABASE, UserAccount } from './donnes';

@Component({
  selector: 'app-root',
  standalone: true,
  // On importe ici tous les composants enfants pour pouvoir les utiliser dans le HTML
  imports: [CommonModule, Login, Stats, Food, Journal],
  styleUrl: './app.css',
  template: `
    <!-- Si pas connecté, on affiche le composant de Login -->
    @if (!currentUser) {
      <app-login (loginSuccess)="onLogin($event)"></app-login>
    }

    <!-- Sinon, on affiche l'application principale -->
    @else {
      <div class="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20">

        <!-- Header (En-tête) -->
        <header class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 shadow-lg sticky top-0 z-10">
          <div class="max-w-md mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold flex items-center gap-2">CalorieGuard</h1>
            <div class="flex gap-2">
              <button (click)="handleResetDay()" class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Réinitialiser">
                <!-- Icone Reset -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button (click)="handleLogout()" class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Déconnexion">
                <!-- Icone Logout -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </button>
            </div>
          </div>
        </header>

        <main class="max-w-md mx-auto px-4 mt-6">

          <!-- Composant Statistiques (Jauge + Coach) -->
          <app-stats
            [totalCalories]="totalCalories"
            [dailyGoal]="dailyGoal"
            [userName]="currentDisplayName"
            (goalChange)="updateGoal($event)">
          </app-stats>

          <!-- Composant Formulaire (Ajout rapide + Recettes) -->
          <app-food
            [foodDatabase]="foodDatabase"
            [customFoods]="customFoods"
            (addFood)="addFood($event)"
            (saveCustomFood)="saveCustom($event)"
            (deleteCustomFood)="deleteCustom($event)">
          </app-food>

          <!-- Composant Journal (Liste des repas) -->
          <app-journal
            [items]="items"
            [userName]="currentDisplayName"
            (deleteItem)="deleteItem($event)">
          </app-journal>

        </main>
      </div>
    }
  `
})
export class AppComponent implements OnInit {
  currentUser: string | null = null;
  currentDisplayName = '';

  dailyGoal = 2000;
  items: FoodItem[] = [];
  customFoods: DatabaseItem[] = [];
  foodDatabase = FOOD_DATABASE;

  // Calcul automatique du total
  get totalCalories() {
    return this.items.reduce((acc, item) => acc + item.calories, 0);
  }

  ngOnInit() {
    // Vérification de la session au démarrage
    const savedSession = localStorage.getItem('calorieTrackerActiveUser');
    if (savedSession) this.onLogin(JSON.parse(savedSession));
  }

  // --- GESTION UTILISATEUR ---
  onLogin(user: UserAccount) {
    this.currentUser = user.username;
    this.currentDisplayName = user.name;
    localStorage.setItem('calorieTrackerActiveUser', JSON.stringify(user));
    this.loadUserData();
  }

  handleLogout() {
    localStorage.removeItem('calorieTrackerActiveUser');
    this.currentUser = null;
    this.items = [];
    this.customFoods = [];
  }

  // --- PERSISTANCE DES DONNÉES ---
  loadUserData() {
    if (!this.currentUser) return;
    const items = localStorage.getItem(`calorieTrackerItems_${this.currentUser}`);
    const goal = localStorage.getItem(`calorieTrackerGoal_${this.currentUser}`);
    const customs = localStorage.getItem(`calorieTrackerCustomFoods_${this.currentUser}`);

    this.items = items ? JSON.parse(items) : [];
    this.dailyGoal = goal ? parseInt(goal) : 2000;
    this.customFoods = customs ? JSON.parse(customs) : [];
  }

  saveData() {
    if (!this.currentUser) return;
    localStorage.setItem(`calorieTrackerItems_${this.currentUser}`, JSON.stringify(this.items));
    localStorage.setItem(`calorieTrackerGoal_${this.currentUser}`, this.dailyGoal.toString());
    localStorage.setItem(`calorieTrackerCustomFoods_${this.currentUser}`, JSON.stringify(this.customFoods));
  }

  // --- ACTIONS VENANT DES ENFANTS ---
  updateGoal(newGoal: number) {
    this.dailyGoal = newGoal;
    this.saveData();
  }

  addFood(item: FoodItem) {
    this.items = [item, ...this.items];
    this.saveData();
  }

  deleteItem(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveData();
  }

  saveCustom(food: DatabaseItem) {
    // Vérification anti-doublon
    const exists = this.customFoods.some(f => f.name.toLowerCase() === food.name.toLowerCase());
    if (exists) {
      alert('Ce plat existe déjà dans vos favoris !');
      return;
    }
    this.customFoods = [food, ...this.customFoods];
    this.saveData();
  }

  deleteCustom(food: DatabaseItem) {
    if (confirm(`Voulez-vous vraiment supprimer "${food.name}" de vos favoris ?`)) {
      this.customFoods = this.customFoods.filter(f => f !== food);
      this.saveData();
    }
  }

  handleResetDay() {
    if (confirm('Voulez-vous vraiment effacer tout l\'historique d\'aujourd\'hui ?')) {
      this.items = [];
      this.saveData();
    }
  }
}
