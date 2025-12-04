import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatabaseItem, FoodItem, Ingredient} from '../donnes';
@Component({
  selector: 'app-food',
  imports: [
    FormsModule
  ],
  templateUrl: './food.html',
  styleUrl: './food.css',
})
export class Food {
  @Input() foodDatabase: DatabaseItem[] = [];
  @Input() customFoods: DatabaseItem[] = [];
  @Output() addFood = new EventEmitter<FoodItem>();
  @Output() saveCustomFood = new EventEmitter<DatabaseItem>();
  @Output() deleteCustomFood = new EventEmitter<DatabaseItem>();

  mode: 'simple' | 'recipe' = 'simple';
  showSuggestions = false;
  suggestionFilter: 'all' | 'custom' = 'all';
  isAnalyzing = false;

  // Simple Form
  foodName = '';
  calories: string | number = '';
  inputQuantity: number | null = null;
  currentUnit = 'g';
  currentBaseCalories = 0;
  currentStandardAmount = 100;
  apiKey= ""
  // Recipe Form
  recipeName = '';
  recipeIngredients: Ingredient[] = [];
  ingName = '';
  ingCal: string | number = '';

  get allFoods() { return [...this.customFoods, ...this.foodDatabase.sort((a, b) =>
    a.name.localeCompare(b.name))]; }
  get recipeTotal() { return this.recipeIngredients.reduce((acc, i) => acc + i.calories, 0); }
  suggestions: string[] = [];



  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;

    // Si on ouvre le menu → afficher tous les aliments (optionnel)
    if (this.showSuggestions) {
      this.suggestions = this.allFoods.map(f => f.name).slice(0, 20);
    }
  }

  selectSuggestion(name: string) {
    this.foodName = name;
    this.showSuggestions = false;
  }



  // --- SIMPLE FORM LOGIC ---
  selectFood(food: DatabaseItem) {
    this.foodName = food.name;
    this.currentBaseCalories = food.calories;
    this.currentStandardAmount = food.standardAmount;
    this.currentUnit = food.unit;
    this.inputQuantity = food.standardAmount;
    this.recalcCalories();
  }

  recalcCalories() {
    if (this.inputQuantity && this.currentStandardAmount > 0) {
      this.calories = Math.round((this.inputQuantity / this.currentStandardAmount) * this.currentBaseCalories);
    }
  }

  onNameChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input.value.toLowerCase().trim();

    if (!val) {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.allFoods
      .filter(f => f.name.toLowerCase().includes(val))
      .map(f => f.name)
      .slice(0, 10);

    this.showSuggestions = true; // <= affichage auto quand on tape
  }



  submitFood() {
    if (!this.foodName || !this.calories) return;
    this.addFood.emit({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: this.foodName,
      calories: Number(this.calories),
      quantity: this.inputQuantity || undefined,
      unit: this.currentUnit,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.resetSimple();
  }

  onSaveCustom() {
    this.saveCustomFood.emit({
      name: this.foodName,
      calories: Number(this.calories),
      standardAmount: this.inputQuantity || 1,
      unit: this.currentUnit,
      isCustom: true
    });
  }

  onDeleteCustom(food: DatabaseItem, e: Event) {
    e.stopPropagation();
    this.deleteCustomFood.emit(food);
  }
  resetSimple() {
    this.foodName = '';
    this.calories = '';
    this.inputQuantity = null;
    this.currentUnit = 'g';
  }

  // --- RECIPE LOGIC ---
  onIngChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    const match = this.foodDatabase.find(f => f.name.toLowerCase() === val.toLowerCase());
    if (match) this.ingCal = match.calories;
  }

  addIngredient() {
    if (!this.ingName || !this.ingCal) return;
    this.recipeIngredients.push({ name: this.ingName, calories: Number(this.ingCal) });
    this.ingName = ''; this.ingCal = '';
  }

  removeIngredient(i: number) {
    this.recipeIngredients.splice(i, 1);
  }

  submitRecipe() {
    this.saveCustomFood.emit({
      name: this.recipeName,
      calories: this.recipeTotal,
      standardAmount: 1,
      unit: 'portion',
      isCustom: true
    });
    this.recipeName = '';
    this.recipeIngredients = [];
    this.mode = 'simple';
  }
}
