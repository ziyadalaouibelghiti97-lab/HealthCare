import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FoodItem} from '../donnes';

@Component({
  selector: 'app-journal',
  imports: [],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal {

  @Input() items: FoodItem[] = [];
  @Input() userName = '';
  @Output() deleteItem = new EventEmitter<string>();

  onDelete(id: string) {
    this.deleteItem.emit(id);
  }
}
