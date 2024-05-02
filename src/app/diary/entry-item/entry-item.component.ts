import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExerciseSet } from '../interfaces/exercise-set';

@Component({
  selector: 'app-entry-item',
  standalone: true,
  imports: [],
  templateUrl: './entry-item.component.html',
  styleUrl: './entry-item.component.css',
})
export class EntryItemComponent {
  @Input('exercise-set') exerciseSet!: ExerciseSet;

  @Output() editEvent = new EventEmitter<ExerciseSet>()
  @Output() deleteEvent = new EventEmitter<string>()

  delete(){
    this.deleteEvent.emit(this.exerciseSet.id)
  }

  editEntry(){
    /*const reps = ++this.exerciseSet.reps
    const newItem : ExerciseSet = {
      ...this.exerciseSet,
      reps,
    }*/
    this.editEvent.emit(this.exerciseSet)
  }
}
