import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleValidator } from './custom-validation';
import { ExerciseSet } from '../interfaces/exercise-set';

@Component({
  selector: 'app-new-entry-form-reactive',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule,CommonModule],
  templateUrl: './new-entry-form-reactive.component.html',
  styleUrl: './new-entry-form-reactive.component.css',
  providers: [ExerciseSetsService]
})
export class NewEntryFormReactiveComponent implements OnInit {

  @Input('id') entryId?: string | null

  public entryForm!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private exerciseSetsService = inject(ExerciseSetsService);
  private router = inject(Router)
  private route = inject(ActivatedRoute);
  //private entryId?: string | null

  ngOnInit(): void {
    /*this.entryForm = this.formBuilder.group({
      date: ['', Validators.required],
      exercise: ['', Validators.required],
      sets: [0, [Validators.required, Validators.min(0), multipleValidator(2)]],
      reps: [0, [Validators.min(0)], multipleValidator(3)],
    });*/
    //this.entryId = this.route.snapshot.paramMap.get('id')
    if(this.entryId){
       /*this.exerciseSetsService
         .getItem(this.entryId)
         .subscribe((entry)=> this.updateForm(entry))*/
      this.route.data.subscribe(({entry})=>{
        this.updateForm(entry)
      })
    }
  }

  updateForm(entry: ExerciseSet){
     let { id: _, ...entryForm } = entry
     this.entryForm.setValue(entryForm)
  }

  newEntry() {
    if (this.entryForm.valid) {
      const newEntry = { ...this.entryForm.value };
      /*this.exerciseSetsService
        .addNewItem(newEntry)
        .subscribe((entry) => this.router.navigate(['/home']));
        */
       if(this.entryId){
          this.exerciseSetsService
             .updateItem(this.entryId, newEntry)
             .subscribe((entry)=> this.router.navigate(['/home']))
       }else{

       }
    }
  }
}
