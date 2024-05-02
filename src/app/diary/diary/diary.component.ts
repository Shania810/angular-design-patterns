import { Component, inject, OnInit } from '@angular/core';
import { EntryItemComponent } from '../entry-item/entry-item.component';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { CommonModule } from '@angular/common';
import { ListEntriesComponent } from '../list-entries/list-entries.component';
import { NewItemButtonComponent } from '../new-item-button/new-item-button.component';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [EntryItemComponent, CommonModule,ListEntriesComponent,ListEntriesComponent,NewItemButtonComponent],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
})
export class DiaryComponent implements OnInit {
 /* exerciseList: ExerciseSetList = [
    {
      id: '1',
      date: new Date(),
      exercise: 'Deadlift',
      reps: 15,
      sets: 3,
    },
    {
      id: '2',
      date: new Date(),
      exercise: 'Squat',
      reps: 15,
      sets: 3,
    },
    {
      id: '3',
      date: new Date(),
      exercise: 'Barbell row',
      reps: 15,
      sets: 3,
    },
  ];*/

  /*newList(){
    this.exerciseList = [
      {
        id: '1',
        date: new Date(),
        exercise: 'Deadlift',
        reps: 15,
        sets: 3
      },
      {
        id: '2',
        date: new Date(),
        exercise: 'Squat',
        reps: 15,
        sets: 3
      },
      {
        id: '3',
        date: new Date(),
        exercise: 'Barbell row',
        reps: 15,
        sets: 3
      },
      {
        id: '4',
        date: new Date(),
        exercise: 'Leg Press',
        reps: 15,
        sets: 3
      }
    ]
  }*/

  itemTrackBy(index: number, item: ExerciseSet){
     return item.id
  }

  /*addExercise(newSet: ExerciseSet){
    this.exerciseList.push(newSet)
  }*/

  private exerciseSetsService = inject(ExerciseSetsService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  //exerciseList = this.exerciseSetsService.getInitialList()
  exerciseList !: ExerciseSetList

  ngOnInit(): void {
      /*this.exerciseSetsService
        .getInitialList()
        .subscribe((dataApi)=>(this.exerciseList = dataApi.items))
        */
       this.route.data.subscribe(({diaryApi})=>{
        this.exerciseList = diaryApi.items
       })
  }

  newList(){
    this.exerciseSetsService
      .refreshList()
      .subscribe((dataApi) => (this.exerciseList = dataApi.items))
  }
  /*addExercise(newSet: ExerciseSet){
    this.exerciseSetsService
      .addNewItem(newSet)
      .subscribe((_) => (this.newList()))
  }*/

  addExercise(newSet: ExerciseSet){
    this.router.navigate(['/home/diary/entry'])
  }

  deleteItem(id: string){
      /*this.exerciseSetsService.deleteItem(id).subscribe(()=>{
        this.exerciseList = this.exerciseList.filter(
          (exerciseSet) => exerciseSet.id !== id
        )
      })*/
      this.exerciseSetsService.deleteItem(id).subscribe()
  }
  editEntry(updateSet: ExerciseSet){
     const id = updateSet.id ?? ''
     /*this.exerciseSetsService
       .updateItem(id, updateSet)
       .subscribe()*/
       this.router.navigate([`/home/diary/entry/${id}`])
  }

}
