import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EntryItemComponent } from '../entry-item/entry-item.component';
import { CommonModule } from '@angular/common';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';

@Component({
  selector: 'app-list-entries',
  standalone: true,
  imports: [EntryItemComponent,CommonModule],
  templateUrl: './list-entries.component.html',
  styleUrl: './list-entries.component.css',
  //providers: [ExerciseSetsService]
})
export class ListEntriesComponent {
  @Input() exerciseList !: ExerciseSetList;
  @Output() editEvent = new EventEmitter<ExerciseSet>()
  @Output() deleteEvent = new EventEmitter<string>()

  //private exerciseSetsService = inject(ExerciseSetsService)
  //exerciseList = this.exerciseSetsService.getInitialList()

  itemTrackBy(index: number, item: ExerciseSet){
    return item.id
  }

  deleteItem(id: string){
    this.exerciseList = this.exerciseList.filter((item)=> item.id !== id)
  }

  newRep(exerciseSet: ExerciseSet){
    const id = exerciseSet.id
    const i = this.exerciseList.findIndex((item)=> item.id === id)
    if(i >= 0){
      this.exerciseList[i] = {...exerciseSet}
    }
  }
}
