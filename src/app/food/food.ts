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

  get allFoods() { return [...this.customFoods, ...this.foodDatabase]; }
  get recipeTotal() { return this.recipeIngredients.reduce((acc, i) => acc + i.calories, 0); }
  suggestions: string[] = [];



  selectSuggestion(name: string) {
    this.foodName = name;
    this.suggestions = [];
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

    // ✔ Détection auto quand l'input correspond exactement à un aliment
    const exactMatch = this.allFoods.find(f => f.name.toLowerCase() === val);
    if (exactMatch) {
      this.selectFood(exactMatch);
    }

    // ✔ Si l’input est vide
    if (!val) {
      this.suggestions = [];
      return;
    }

    // ✔ Suggestions
    this.suggestions = this.allFoods
      .filter(f => f.name.toLowerCase().includes(val))
      .map(f => f.name)
      .slice(0, 10);
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

  async estimateCalories() {
    if (!this.foodName) return;
    this.isAnalyzing = true;
    try {
      const prompt = `Donne les calories pour "${this.foodName}". JSON: {"calories": number, "unit": "g"|"pièce", "standardAmount": number}.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generatteContent?key=${this.apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
      const data = await response.json();
      const res = JSON.parse(data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim());
      if (res.calories) {
        this.currentBaseCalories = res.calories;
        this.currentUnit = res.unit || 'g';
        this.currentStandardAmount = res.standardAmount || 100;
        this.inputQuantity = this.currentStandardAmount;
        this.recalcCalories();
      }
    } catch (e) { console.error(e); } finally { this.isAnalyzing = false; }
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
