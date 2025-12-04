import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  @Input() totalCalories = 0;
  @Input() dailyGoal = 2000;
  @Input() userName = '';
  @Output() goalChange = new EventEmitter<number>();

  tempGoal = 2000;
  showGoalInput = false;
  isCoachLoading = false;
  coachTip = '';
  apiKey = '';


  get remainingCalories() { return this.dailyGoal - this.totalCalories; }
  get progressPercentage() { return Math.min((this.totalCalories / this.dailyGoal) * 100, 100); }
  get isOverLimit() { return this.totalCalories > this.dailyGoal; }

  ngOnChanges() {
    this.tempGoal = this.dailyGoal;
  }

  updateGoal() {
    this.goalChange.emit(this.tempGoal);
    this.showGoalInput = false;
  }

  async getCoachTip() {
    this.isCoachLoading = true;
    this.coachTip = '';
    try {
      const context = `Utilisateur: ${this.userName}, Objectif: ${this.dailyGoal} kcal, Consommé: ${this.totalCalories} kcal, Restant: ${this.remainingCalories} kcal`;
      const prompt = `Tu es un coach nutritionnel. Analyse : ${context}. Donne UNE phrase courte d'encouragement en français.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${(this.apiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
      const data = await response.json();
      this.coachTip = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Bravo !";
    } catch (error) { this.coachTip = "Le coach dort 😴."; } finally { this.isCoachLoading = false; }}
}
